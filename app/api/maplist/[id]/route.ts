import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * A shared Google Maps list (Talia and Mel's saved places) is read live, so
 * whatever they save in Google Maps shows up in the app without a new deploy.
 * Only list ids pass through; the host is fixed, so this cannot be pointed at
 * any other site.
 */
const ID = /^[A-Za-z0-9_-]{10,40}$/;
type Place = { name: string; address: string; note: string; lat: number | null; lng: number | null; url: string };

const cache = new Map<string, { at: number; body: unknown }>();
const TTL = 10 * 60 * 1000;

function parse(id: string, text: string) {
  const json = JSON.parse(text.replace(/^\)\]\}'\s*/, ''));
  const list = json[0];
  const title: string = list?.[4] || '';
  const items: unknown[] = Array.isArray(list?.[8]) ? list[8] : [];
  const places: Place[] = items.map((raw) => {
    const it = raw as unknown[];
    const loc = (it?.[1] as unknown[]) || [];
    const coords = (loc[5] as unknown[]) || [];
    const lat = typeof coords[2] === 'number' ? (coords[2] as number) : null;
    const lng = typeof coords[3] === 'number' ? (coords[3] as number) : null;
    const name = String(it?.[2] || '');
    const address = String(loc[4] || loc[2] || '');
    const q = lat != null && lng != null ? `${lat},${lng}` : `${name} ${address}`;
    return {
      name,
      address,
      note: String(it?.[3] || ''),
      lat,
      lng,
      url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`,
    };
  }).filter((p) => p.name || p.address);
  return { id, title, url: `https://www.google.com/maps/placelists/list/${id}`, places };
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) return NextResponse.json({ error: 'לא מחוברים' }, { status: 401 });
  const { id } = await params;
  if (!ID.test(id)) return NextResponse.json({ error: 'מזהה רשימה לא תקין' }, { status: 400 });

  const hit = cache.get(id);
  if (hit && Date.now() - hit.at < TTL) return NextResponse.json(hit.body);

  const pb = `!1m4!1s${id}!2e1!3m1!1e1!2e2!3e2!4i500!16b1`;
  const src = `https://www.google.com/maps/preview/entitylist/getlist?authuser=0&hl=he&gl=il&pb=${encodeURIComponent(pb)}`;
  try {
    const res = await fetch(src, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Google Maps החזיר ${res.status}`);
    const body = parse(id, await res.text());
    cache.set(id, { at: Date.now(), body });
    return NextResponse.json(body);
  } catch (e) {
    if (hit) return NextResponse.json(hit.body);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'לא הצלחנו לקרוא את הרשימה' },
      { status: 502 }
    );
  }
}
