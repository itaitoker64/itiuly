import { NextResponse } from 'next/server';
import { createHash, timingSafeEqual } from 'crypto';
import { sql, ensureSchema } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * One-time import of the booking confirmations into the private file store.
 * Only the SHA-256 of the key is here; the key itself never enters the repo.
 * The route stops working after the expiry and is deleted after use.
 */
const KEY_SHA256 = '4a719158071567b041498a28024510dc19ba8f5acb02d2d7ff6ed5777d2d6b2c';
const EXPIRES = Date.parse('2026-11-17T00:00:00Z');
const MAX_BYTES = 6 * 1024 * 1024;

function authorized(request: Request) {
  if (Date.now() > EXPIRES) return false;
  const key = request.headers.get('x-import-key') || '';
  const got = createHash('sha256').update(key).digest();
  return timingSafeEqual(got, Buffer.from(KEY_SHA256, 'hex'));
}

export async function POST(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: 'not found' }, { status: 404 });
  await ensureSchema();
  const form = await request.formData();
  const file = form.get('file');
  const name = String(form.get('name') || '').slice(0, 200);
  if (!(file instanceof File) || !name) return NextResponse.json({ error: 'file and name required' }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: 'too large' }, { status: 413 });
  const existing = (await sql`SELECT id FROM trip_files WHERE name = ${name}`) as { id: string }[];
  if (existing.length) return NextResponse.json({ file: { id: existing[0].id, name }, skipped: true });
  const id = 'f_' + crypto.randomUUID();
  const bytes = Buffer.from(await file.arrayBuffer());
  await sql`
    INSERT INTO trip_files (id, name, mime, bytes, size, uploaded_by)
    VALUES (${id}, ${name}, 'application/pdf', ${bytes}, ${bytes.length}, 'itai')
  `;
  return NextResponse.json({ file: { id, name, size: bytes.length } });
}
