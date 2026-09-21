import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { sql, ensureSchema } from '@/lib/db';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';
import { getUser } from '@/lib/users';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * The documents worth having on a phone in Thailand — a passport scan, the
 * insurance policy, a booking confirmation — are kept in the same database as
 * the plan. A few megabytes of scans needs no second service, and everything
 * stays behind the same login.
 */
const MAX_BYTES = 6 * 1024 * 1024;
const ALLOWED = /^(image\/(png|jpeg|webp|heic|heif)|application\/pdf)$/;

async function currentUser() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);
  return session ? getUser(session.username) ?? null : null;
}

export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'לא מחוברים' }, { status: 401 });
  try {
    await ensureSchema();
    const rows = (await sql`
      SELECT id, name, mime, size, uploaded_by, uploaded_at
        FROM trip_files ORDER BY uploaded_at DESC
    `) as Record<string, unknown>[];
    return NextResponse.json({ files: rows });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'שגיאת שרת' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'לא מחוברים' }, { status: 401 });

  try {
    await ensureSchema();
    const form = await request.formData();
    const file = form.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'לא נבחר קובץ' }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: 'הקובץ גדול מ-6MB — נסו לצלם מחדש באיכות נמוכה יותר' },
        { status: 413 }
      );
    }
    const mime = file.type || 'application/octet-stream';
    if (!ALLOWED.test(mime)) {
      return NextResponse.json(
        { error: 'אפשר להעלות תמונות ו-PDF בלבד' },
        { status: 415 }
      );
    }

    const id = 'f_' + crypto.randomUUID();
    const bytes = Buffer.from(await file.arrayBuffer());
    const name = String(form.get('name') || file.name || 'מסמך').slice(0, 200);

    await sql`
      INSERT INTO trip_files (id, name, mime, bytes, size, uploaded_by)
      VALUES (${id}, ${name}, ${mime}, ${bytes}, ${bytes.length}, ${user.username})
    `;
    return NextResponse.json({
      file: { id, name, mime, size: bytes.length, uploaded_by: user.username },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'שגיאת שרת' },
      { status: 500 }
    );
  }
}
