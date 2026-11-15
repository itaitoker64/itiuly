import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';

/**
 * Everything except the login screen, the auth API and static assets requires
 * a valid session cookie.
 */
export async function middleware(request: NextRequest) {
  const session = await verifySessionToken(
    request.cookies.get(SESSION_COOKIE)?.value
  );
  if (session) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = '/login';
  url.search = '';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Guard every path except:
     *  - /login and the auth endpoints
     *  - the family follow page and its API (/follow/<token>, /api/follow/<token>),
     *    and /api/ping for the phone's location shortcut — each checks its own token
     *  - Next.js internals, the favicon, the app icons, the web app manifest and
     *    the service worker — the browser fetches the manifest and icons without
     *    the session cookie, and without them the app cannot be installed
     * The app's own JS/CSS stay guarded too, so nothing of the plan is served
     * to someone who is not signed in.
     */
    '/((?!login|api/auth|api/ping|api/follow|follow/|follow-app.js|journal-view.js|journal.css|_next/static|_next/image|favicon.ico|icons/|manifest.webmanifest|sw.js).*)',
  ],
};
