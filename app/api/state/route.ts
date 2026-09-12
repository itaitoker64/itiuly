import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { sql, ensureSchema } from '@/lib/db';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';
import { getUser } from '@/lib/users';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const STATE_ID = 'trip';

type StateRow = {
  data: unknown;
  version: string | number;
  updated_at: string;
  updated_by: string | null;
};

async function currentUser() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);
  return session ? getUser(session.username) ?? null : null;
}

function describe(row: StateRow | undefined) {
  if (!row) return { data: null, version: 0, updatedAt: null, updatedBy: null };
  const by = row.updated_by ? getUser(row.updated_by) : null;
  return {
    data: row.data,
    version: Number(row.version),
    updatedAt: row.updated_at,
    updatedBy: by ? { ...by } : null,
  };
}

/** Full state, or just the version when called with ?meta=1 (used by polling). */
export async function GET(request: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'לא מחוברים' }, { status: 401 });

  try {
    await ensureSchema();
    const metaOnly = new URL(request.url).searchParams.get('meta') === '1';
    const rows = metaOnly
      ? ((await sql`
          SELECT NULL::jsonb AS data, version, updated_at, updated_by
            FROM trip_state WHERE id = ${STATE_ID}
        `) as StateRow[])
      : ((await sql`
          SELECT data, version, updated_at, updated_by
            FROM trip_state WHERE id = ${STATE_ID}
        `) as StateRow[]);
    return NextResponse.json({ ...describe(rows[0]), me: user });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'שגיאת שרת' },
      { status: 500 }
    );
  }
}

/**
 * Saves the whole trip document. `baseVersion` is the version the client last
 * saw; if the row has moved on since, nothing is written and the current
 * server state comes back with 409 so the client can reload instead of
 * overwriting the other person's change.
 */
export async function PUT(request: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'לא מחוברים' }, { status: 401 });

  let data: unknown;
  let baseVersion = 0;
  try {
    const body = await request.json();
    data = body?.data;
    baseVersion = Number(body?.baseVersion ?? 0);
  } catch {
    return NextResponse.json({ error: 'בקשה לא תקינה' }, { status: 400 });
  }
  if (!data || typeof data !== 'object') {
    return NextResponse.json({ error: 'אין נתונים לשמירה' }, { status: 400 });
  }

  try {
    await ensureSchema();
    const json = JSON.stringify(data);

    if (baseVersion === 0) {
      // First write ever — only succeeds while the row does not exist yet.
      const inserted = (await sql`
        INSERT INTO trip_state (id, data, version, updated_at, updated_by)
        VALUES (${STATE_ID}, ${json}::jsonb, 1, now(), ${user.username})
        ON CONFLICT (id) DO NOTHING
        RETURNING data, version, updated_at, updated_by
      `) as StateRow[];
      if (inserted.length > 0) {
        return NextResponse.json({ ...describe(inserted[0]), me: user });
      }
    } else {
      const updated = (await sql`
        UPDATE trip_state
           SET data = ${json}::jsonb,
               version = version + 1,
               updated_at = now(),
               updated_by = ${user.username}
         WHERE id = ${STATE_ID} AND version = ${baseVersion}
        RETURNING data, version, updated_at, updated_by
      `) as StateRow[];
      if (updated.length > 0) {
        return NextResponse.json({ ...describe(updated[0]), me: user });
      }
    }

    // Someone else wrote first — hand back what is actually stored.
    const rows = (await sql`
      SELECT data, version, updated_at, updated_by
        FROM trip_state WHERE id = ${STATE_ID}
    `) as StateRow[];
    return NextResponse.json(
      { conflict: true, ...describe(rows[0]), me: user },
      { status: 409 }
    );
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'שגיאת שרת' },
      { status: 500 }
    );
  }
}
