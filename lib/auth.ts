/**
 * Auth built on Web Crypto only, so the same helpers run in the Edge
 * middleware and in the Node route handlers.
 *
 * Session cookie: base64url(payload).base64url(HMAC-SHA256(payload))
 * Password hash:  pbkdf2$<iterations>$<saltB64>$<hashB64>
 */

const COOKIE_NAME = 'itiuly_session';
const SESSION_DAYS = 60;
const PBKDF2_ITERATIONS = 120_000;

export type Session = { username: string; exp: number };

function secret(): string {
  const s = process.env.AUTH_SECRET;
  if (!s) {
    throw new Error(
      'חסר AUTH_SECRET — הגדירו מחרוזת אקראית ארוכה במשתני הסביבה של הפרויקט ב-Vercel'
    );
  }
  return s;
}

const enc = new TextEncoder();

function b64url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let bin = '';
  for (const b of arr) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromB64url(s: string): Uint8Array {
  const pad = s.replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(pad + '='.repeat((4 - (pad.length % 4)) % 4));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function b64(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

function fromB64(s: string): Uint8Array<ArrayBuffer> {
  const bin = atob(s);
  const out = new Uint8Array(new ArrayBuffer(bin.length));
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmac(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  return b64url(await crypto.subtle.sign('HMAC', key, enc.encode(payload)));
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken(username: string): Promise<string> {
  const payload: Session = {
    username,
    exp: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000,
  };
  const encoded = b64url(enc.encode(JSON.stringify(payload)));
  return `${encoded}.${await hmac(encoded)}`;
}

export async function verifySessionToken(
  token: string | undefined | null
): Promise<Session | null> {
  if (!token) return null;
  const [encoded, sig] = token.split('.');
  if (!encoded || !sig) return null;
  try {
    if (!timingSafeEqual(sig, await hmac(encoded))) return null;
    const session = JSON.parse(
      new TextDecoder().decode(fromB64url(encoded))
    ) as Session;
    if (!session.username || typeof session.exp !== 'number') return null;
    if (session.exp < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    key,
    256
  );
  return `pbkdf2$${PBKDF2_ITERATIONS}$${b64(salt)}$${b64(new Uint8Array(bits))}`;
}

export async function verifyPassword(
  password: string,
  stored: string
): Promise<boolean> {
  const [scheme, iterStr, saltB64, hashB64] = stored.split('$');
  if (scheme !== 'pbkdf2') return false;
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: fromB64(saltB64),
      iterations: Number(iterStr),
      hash: 'SHA-256',
    },
    key,
    256
  );
  return timingSafeEqual(b64(new Uint8Array(bits)), hashB64);
}

export const SESSION_COOKIE = COOKIE_NAME;
export const SESSION_MAX_AGE = SESSION_DAYS * 24 * 60 * 60;
