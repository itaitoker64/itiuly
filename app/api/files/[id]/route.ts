import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { sql, ensureSchema } from '@/lib/db';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';
import { getUser } from '@/lib/users';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function currentUser() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);
  return session ? getUser(session.username) ?? null : null;
}

type FileRow = { name: string; mime: string; bytes: Buffer };

/** Serves one document to whoever is signed in — nothing here is public. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'לא מחוברים' }, { status: 401 });

  const { id } = await params;
  try {
    await ensureSchema();
    const rows = (await sql`
      SELECT name, mime, bytes FROM trip_files WHERE id = ${id}
    `) as FileRow[];
    if (rows.length === 0) {
      return NextResponse.json({ error: 'המסמך לא נמצא' }, { status: 404 });
    }
    const row = rows[0];
    const body = Buffer.isBuffer(row.bytes) ? row.bytes : Buffer.from(row.bytes);
    return new NextResponse(new Uint8Array(body), {
      headers: {
        'Content-Type': row.mime,
        'Content-Disposition': `inline; filename*=UTF-8''${encodeURIComponent(row.name)}`,
        'Cache-Control': 'private, max-age=86400',
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'שגיאת שרת' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'לא מחוברים' }, { status: 401 });

  const { id } = await params;
  try {
    await ensureSchema();
    await sql`DELETE FROM trip_files WHERE id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'שגיאת שרת' },
      { status: 500 }
    );
  }
}
