import { NextResponse } from 'next/server';
import { sql, ensureSchema } from '@/lib/db';
import { followTokenValid } from '@/lib/journal';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** A journal photo for the follow link — only files that belong to a step, never other documents. */
export async function GET(_request: Request, { params }: { params: Promise<{ token: string; id: string }> }) {
  const { token, id } = await params;
  try {
    if (!(await followTokenValid(token))) return NextResponse.json({ error: 'הקישור לא פעיל' }, { status: 404 });
    await ensureSchema();
    const used = (await sql`
      SELECT 1 FROM trip_steps WHERE photos ? ${id} LIMIT 1
    `) as unknown[];
    if (!used.length) return NextResponse.json({ error: 'לא נמצא' }, { status: 404 });
    const rows = (await sql`SELECT mime, bytes FROM trip_files WHERE id = ${id}`) as { mime: string; bytes: Buffer }[];
    if (!rows.length || !/^image\//.test(rows[0].mime)) return NextResponse.json({ error: 'לא נמצא' }, { status: 404 });
    const body = Buffer.isBuffer(rows[0].bytes) ? rows[0].bytes : Buffer.from(rows[0].bytes);
    return new NextResponse(new Uint8Array(body), {
      headers: { 'Content-Type': rows[0].mime, 'Cache-Control': 'public, max-age=86400' },
    });
  } catch {
    return NextResponse.json({ error: 'שגיאת שרת' }, { status: 500 });
  }
}
