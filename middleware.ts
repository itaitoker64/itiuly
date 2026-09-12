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
     *  - Next.js internals and the favicon
     * The app's own JS/CSS stay guarded too, so nothing of the plan is served
     * to someone who is not signed in.
     */
    '/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};
