import { PUT } from '../route';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * `navigator.sendBeacon` can only POST, so this is the same save as PUT
 * /api/state — used on page unload when a change has not been flushed yet.
 */
export async function POST(request: Request) {
  return PUT(request);
}
