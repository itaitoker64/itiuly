import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/session-user';
import { newToken, setSetting } from '@/lib/journal';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * follow-on / follow-off: the read-only link for family.
 * ping-new: a personal token for the phone's background location shortcut.
 */
export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'לא מחוברים' }, { status: 401 });
  try {
    const body = (await request.json().catch(() => null)) as { action?: string } | null;
    const action = body?.action;
    if (action === 'follow-on') {
      const token = newToken();
      await setSetting('follow', token);
      return NextResponse.json({ follow: token });
    }
    if (action === 'follow-off') {
      await setSetting('follow', null);
      return NextResponse.json({ follow: null });
    }
    if (action === 'ping-new') {
      const token = newToken();
      await setSetting('ping:' + user.username, token);
      return NextResponse.json({ ping: token });
    }
    return NextResponse.json({ error: 'פעולה לא מוכרת' }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'שגיאת שרת' }, { status: 500 });
  }
}
