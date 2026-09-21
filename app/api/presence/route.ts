import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { sql, ensureSchema } from '@/lib/db';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';
import { getUser, USERS } from '@/lib/users';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Who is looking at the plan right now. Two people editing the same trip
 * should be able to see each other — both so a change is expected rather than
 * a surprise, and so the app can sync faster while they are both in it.
 */
const ACTIVE_SECONDS = 45;

async function currentUser() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);
  return session ? getUser(session.username) ?? null : null;
}

export async function POST() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'לא מחוברים' }, { status: 401 });

  try {
    await ensureSchema();
    await sql`
      INSERT INTO presence (username, at) VALUES (${user.username}, now())
      ON CONFLICT (username) DO UPDATE SET at = now()
    `;
    const rows = (await sql`
      SELECT username, at FROM presence
       WHERE username <> ${user.username}
         AND at > now() - (${ACTIVE_SECONDS} || ' seconds')::interval
    `) as { username: string; at: string }[];

    return NextResponse.json({
      others: rows
        .map((row) => {
          const person = USERS.find((u) => u.username === row.username);
          return person ? { ...person, at: row.at } : null;
        })
        .filter(Boolean),
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'שגיאת שרת' },
      { status: 500 }
    );
  }
}
