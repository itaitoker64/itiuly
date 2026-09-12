import { NextResponse } from 'next/server';
import { checkCredentials } from '@/lib/users';
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

  let user;
  try {
    user = await checkCredentials(username, password);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'שגיאת שרת' },
      { status: 500 }
    );
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
