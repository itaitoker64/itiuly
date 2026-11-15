import { NextResponse } from 'next/server';
import { addPoints, cleanPoints, userForPingToken } from '@/lib/journal';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Background location from the phone, which runs even when the trip app is
 * closed — the one thing a web app cannot do itself. Two senders:
 *
 *  - OwnTracks (Android and iPhone), HTTP mode, URL https://…/api/ping?k=<token>.
 *    It posts {"_type":"location","lat":..,"lon":..,"acc":..,"tst":<unix seconds>}
 *    and expects a JSON array back.
 *  - An iPhone Shortcuts automation: POST {"lat":..,"lng":..} to the same URL.
 *
 * Authenticated by a personal token, not the session cookie, and it can only
 * add a point to that person's track.
 */
type Body = Record<string, unknown> | null;

async function handle(k: unknown, body: Body, q: URLSearchParams) {
  const user = typeof k === 'string' && k.length >= 20 ? await userForPingToken(k) : null;
  if (!user) return NextResponse.json({ error: 'קוד לא תקין' }, { status: 401 });

  // OwnTracks also sends other message types (waypoints, transitions); only locations matter.
  if (body && typeof body._type === 'string' && body._type !== 'location') return NextResponse.json([]);

  const lat = body?.lat ?? body?.latitude ?? q.get('lat');
  const lng = body?.lng ?? body?.lon ?? body?.longitude ?? q.get('lng') ?? q.get('lon');
  const acc = body?.acc ?? q.get('acc');
  const tst = Number(body?.tst);
  const at = Number.isFinite(tst) && tst > 1e9 ? new Date(tst * 1000).toISOString() : new Date().toISOString();

  if ((lat === null || lat === undefined || lat === '') && (lng === null || lng === undefined || lng === '')) {
    return NextResponse.json({
      ok: true,
      message: 'הקוד תקין. את הכתובת הזאת לא פותחים בדפדפן — OwnTracks או הקיצור שולחים אליה את המיקום.',
    });
  }
  const points = cleanPoints([{ lat, lng, acc, at }], user, body && body._type ? 'owntracks' : 'shortcut');
  if (!points.length) return NextResponse.json({ error: 'מיקום לא תקין' }, { status: 400 });
  await addPoints(points);
  return body && body._type ? NextResponse.json([]) : NextResponse.json({ ok: true });
}

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams;
  try { return await handle(q.get('k'), null, q); }
  catch { return NextResponse.json({ error: 'שגיאת שרת' }, { status: 500 }); }
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Body;
  const q = new URL(request.url).searchParams;
  try { return await handle(body?.k ?? q.get('k'), body, q); }
  catch { return NextResponse.json({ error: 'שגיאת שרת' }, { status: 500 }); }
}
