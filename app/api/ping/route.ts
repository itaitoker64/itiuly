import { NextResponse } from 'next/server';
import { addPoints, cleanPoints, userForPingToken } from '@/lib/journal';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Background location from the phone's Shortcuts app, which runs on a timer
 * even when the trip app is closed — the one thing a web app cannot do itself.
 * Authenticated by a personal token, not the session cookie, and it can only
 * add a point to that person's track.
 *
 *   POST /api/ping  {"k":"<token>","lat":13.7,"lng":100.5}
 *   GET  /api/ping?k=<token>&lat=13.7&lng=100.5
 */
async function handle(k: unknown, lat: unknown, lng: unknown, acc: unknown) {
  const user = typeof k === 'string' && k.length >= 20 ? await userForPingToken(k) : null;
  if (!user) return NextResponse.json({ error: 'קוד לא תקין' }, { status: 401 });
  if ((lat === null || lat === undefined || lat === '') && (lng === null || lng === undefined || lng === '')) {
    return NextResponse.json({
      ok: true,
      message: 'הקוד תקין. את הכתובת הזאת לא פותחים בדפדפן — האוטומציה בקיצורים שולחת אליה את המיקום (lat, lng).',
    });
  }
  const points = cleanPoints([{ lat, lng, acc, at: new Date().toISOString() }], user, 'shortcut');
  if (!points.length) return NextResponse.json({ error: 'מיקום לא תקין' }, { status: 400 });
  await addPoints(points);
  return NextResponse.json({ ok: true });
}

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams;
  try { return await handle(q.get('k'), q.get('lat'), q.get('lng'), q.get('acc')); }
  catch { return NextResponse.json({ error: 'שגיאת שרת' }, { status: 500 }); }
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const q = new URL(request.url).searchParams;
  try {
    return await handle(body?.k ?? q.get('k'), body?.lat ?? body?.latitude, body?.lng ?? body?.longitude, body?.acc);
  } catch { return NextResponse.json({ error: 'שגיאת שרת' }, { status: 500 }); }
}
