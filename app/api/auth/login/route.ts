import { NextResponse } from 'next/server';
import { checkCredentials } from '@/lib/users';
import { sql, ensureSchema } from '@/lib/db';
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let username = '';
  let password = '';
  try {
    const body = await request.json();
    username = String(body?.username ?? '').trim().toLowerCase();
    password = String(body?.password ?? '');
  } catch {
    return NextResponse.json({ error: 'בקשה לא תקינה' }, { status: 400 });
  }

  if (!username || !password) {
    return NextResponse.json(
      { error: 'צריך לבחור מי אתם ולהקליד סיסמה' },
      { status: 400 }
    );
  }

  // A handful of wrong guesses in a row, then a pause. Two people, one URL —
  // this is only here so the password cannot be ground down at leisure.
  const MAX_TRIES = 8;
  const WINDOW_MINUTES = 15;
  try {
    await ensureSchema();
    const recent = (await sql`
      SELECT count(*)::int AS failures
        FROM login_attempts
       WHERE username = ${username}
         AND ok = false
         AND at > now() - (${WINDOW_MINUTES} || ' minutes')::interval
    `) as { failures: number }[];
    if ((recent[0]?.failures ?? 0) >= MAX_TRIES) {
      return NextResponse.json(
        { error: 'יותר מדי ניסיונות. נסו שוב בעוד רבע שעה' },
        { status: 429 }
      );
    }
  } catch {
    // The database is unreachable; the credential check below will say so.
  }

  let user;
  try {
    user = await checkCredentials(username, password);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'שגיאת שרת' },
      { status: 500 }
    );
  }

  try {
    await sql`INSERT INTO login_attempts (username, ok) VALUES (${username}, ${!!user})`;
    await sql`DELETE FROM login_attempts WHERE at < now() - interval '1 day'`;
  } catch {
    // Recording the attempt must never block a correct sign-in.
  }

  if (!user) {
    return NextResponse.json({ error: 'סיסמה שגויה' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, user });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: await createSessionToken(user.username),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}
