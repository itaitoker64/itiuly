import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/session-user';
import { listJournal, cleanStep, saveStep, getSetting } from '@/lib/journal';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function fail(e: unknown) {
  return NextResponse.json({ error: e instanceof Error ? e.message : 'שגיאת שרת' }, { status: 500 });
}

/** The whole journal, plus the links this user can share. */
export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'לא מחוברים' }, { status: 401 });
  try {
    const journal = await listJournal();
    return NextResponse.json({
      ...journal,
      follow: await getSetting('follow'),
      ping: await getSetting('ping:' + user.username),
    });
  } catch (e) { return fail(e); }
}

/** Adds or updates one step; the author is whoever is signed in. */
export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'לא מחוברים' }, { status: 401 });
  try {
    const body = await request.json().catch(() => null);
    const step = cleanStep(body && (body as { step?: unknown }).step, user.username);
    if (!step) return NextResponse.json({ error: 'צעד לא תקין' }, { status: 400 });
    await saveStep(step);
    return NextResponse.json({ step });
  } catch (e) { return fail(e); }
}
