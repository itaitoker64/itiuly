import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySessionToken } from './auth';
import { getUser } from './users';

export async function currentUser() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);
  return session ? getUser(session.username) ?? null : null;
}
