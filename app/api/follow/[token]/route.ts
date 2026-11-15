import { NextResponse } from 'next/server';
import { followTokenValid, listJournal } from '@/lib/journal';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** The journal for family: steps and track only — nothing of the plan, budget or bookings. */
export async function GET(_request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  try {
    if (!(await followTokenValid(token))) return NextResponse.json({ error: 'הקישור לא פעיל' }, { status: 404 });
    return NextResponse.json(await listJournal(), { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'שגיאת שרת' }, { status: 500 });
  }
}
