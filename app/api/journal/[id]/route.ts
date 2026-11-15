import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/session-user';
import { deleteStep } from '@/lib/journal';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'לא מחוברים' }, { status: 401 });
  try {
    const { id } = await params;
    await deleteStep(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'שגיאת שרת' }, { status: 500 });
  }
}
