import { sql, ensureSchema } from './db';

/**
 * The travel journal, Polarsteps-style: steps (a place, a moment, a few words
 * and photos) and the track the phones recorded between them. It lives in its
 * own tables, not in the plan document, so a month of GPS points never slows
 * the plan's sync.
 */

export type Step = {
  id: string;
  author: string;
  at: string;
  lat: number | null;
  lng: number | null;
  place: string;
  text: string;
  photos: string[];
};

export type TrackPoint = { author: string; at: string; lat: number; lng: number; acc: number | null; source: string };

const ID = /^[A-Za-z0-9_-]{4,80}$/;
const FILE_ID = /^f_[0-9a-f-]{36}$/;

function num(v: unknown): number | null {
  const n = typeof v === 'number' ? v : typeof v === 'string' && v.trim() ? Number(v) : NaN;
  return Number.isFinite(n) ? n : null;
}
function validLatLng(lat: number | null, lng: number | null): boolean {
  return lat !== null && lng !== null && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
}
function validTime(v: unknown): string | null {
  if (typeof v !== 'string') return null;
  const t = Date.parse(v);
  return Number.isFinite(t) ? new Date(t).toISOString() : null;
}

/** Cleans a step that came from a phone: everything is bounded and typed. */
export function cleanStep(raw: unknown, author: string): Step | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const id = typeof r.id === 'string' && ID.test(r.id) ? r.id : null;
  const at = validTime(r.at);
  if (!id || !at) return null;
  let lat = num(r.lat), lng = num(r.lng);
  if (!validLatLng(lat, lng)) { lat = null; lng = null; }
  const photos = Array.isArray(r.photos)
    ? r.photos.filter((p): p is string => typeof p === 'string' && FILE_ID.test(p)).slice(0, 30)
    : [];
  return {
    id, author, at, lat, lng,
    place: String(r.place ?? '').slice(0, 200),
    text: String(r.text ?? '').slice(0, 5000),
    photos,
  };
}

export function cleanPoints(raw: unknown, author: string, source = 'app'): TrackPoint[] {
  if (!Array.isArray(raw)) return [];
  const out: TrackPoint[] = [];
  for (const p of raw.slice(0, 2000)) {
    if (!p || typeof p !== 'object') continue;
    const r = p as Record<string, unknown>;
    const lat = num(r.lat), lng = num(r.lng), at = validTime(r.at);
    if (!at || !validLatLng(lat, lng)) continue;
    out.push({ author, at, lat: lat as number, lng: lng as number, acc: num(r.acc), source });
  }
  return out;
}

export async function listJournal(): Promise<{ steps: Step[]; track: TrackPoint[] }> {
  await ensureSchema();
  const steps = (await sql`
    SELECT id, author, at, lat, lng, place, text, photos FROM trip_steps ORDER BY at
  `) as Record<string, unknown>[];
  const track = (await sql`
    SELECT author, at, lat, lng, acc, source FROM trip_track ORDER BY at
  `) as Record<string, unknown>[];
  return {
    steps: steps.map((s) => ({
      id: String(s.id), author: String(s.author), at: new Date(String(s.at)).toISOString(),
      lat: num(s.lat), lng: num(s.lng), place: String(s.place ?? ''), text: String(s.text ?? ''),
      photos: Array.isArray(s.photos) ? (s.photos as string[]) : [],
    })),
    track: track.map((t) => ({
      author: String(t.author), at: new Date(String(t.at)).toISOString(),
      lat: Number(t.lat), lng: Number(t.lng), acc: num(t.acc), source: String(t.source ?? 'app'),
    })),
  };
}

export async function saveStep(step: Step): Promise<void> {
  await ensureSchema();
  await sql`
    INSERT INTO trip_steps (id, author, at, lat, lng, place, text, photos, updated_at)
    VALUES (${step.id}, ${step.author}, ${step.at}, ${step.lat}, ${step.lng}, ${step.place}, ${step.text},
            ${JSON.stringify(step.photos)}::jsonb, now())
    ON CONFLICT (id) DO UPDATE SET
      at = EXCLUDED.at, lat = EXCLUDED.lat, lng = EXCLUDED.lng, place = EXCLUDED.place,
      text = EXCLUDED.text, photos = EXCLUDED.photos, updated_at = now()
  `;
}

export async function deleteStep(id: string): Promise<void> {
  await ensureSchema();
  await sql`DELETE FROM trip_steps WHERE id = ${id}`;
}

export async function addPoints(points: TrackPoint[]): Promise<number> {
  await ensureSchema();
  let n = 0;
  for (const p of points) {
    await sql`
      INSERT INTO trip_track (author, at, lat, lng, acc, source)
      VALUES (${p.author}, ${p.at}, ${p.lat}, ${p.lng}, ${p.acc}, ${p.source})
      ON CONFLICT (author, at) DO NOTHING
    `;
    n++;
  }
  return n;
}

export async function getSetting(key: string): Promise<string | null> {
  await ensureSchema();
  const rows = (await sql`SELECT value FROM trip_settings WHERE key = ${key}`) as { value: string }[];
  return rows[0]?.value ?? null;
}
export async function setSetting(key: string, value: string | null): Promise<void> {
  await ensureSchema();
  if (value === null) await sql`DELETE FROM trip_settings WHERE key = ${key}`;
  else await sql`
    INSERT INTO trip_settings (key, value) VALUES (${key}, ${value})
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
  `;
}

/** A long random token for links that work without signing in. */
export function newToken(): string {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function sameToken(a: string | null, b: string | null): boolean {
  if (!a || !b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Which user a tracking-shortcut token belongs to. */
export async function userForPingToken(token: string): Promise<string | null> {
  for (const u of ['itai', 'talia']) {
    if (sameToken(await getSetting('ping:' + u), token)) return u;
  }
  return null;
}

/** The follow link is valid while its token is the stored one. */
export async function followTokenValid(token: string): Promise<boolean> {
  return sameToken(await getSetting('follow'), token);
}
