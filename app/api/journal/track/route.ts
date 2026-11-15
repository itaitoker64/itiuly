import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/session-user';
import { addPoints, cleanPoints } from '@/lib/journal';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** GPS points the phone collected while the app was open (or from photos). */
export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'לא מחוברים' }, { status: 401 });
  try {
    const body = (await request.json().catch(() => null)) as { points?: unknown; source?: unknown } | null;
    const source = body && body.source === 'photo' ? 'photo' : 'app';
    const n = await addPoints(cleanPoints(body?.points, user.username, source));
    return NextResponse.json({ saved: n });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'שגיאת שרת' }, { status: 500 });
  }
}
