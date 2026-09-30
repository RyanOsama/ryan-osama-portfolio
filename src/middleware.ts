import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET || 'fallback_secret_key_minimum_32_characters_long_portfolio_2026';
const key = new TextEncoder().encode(SECRET_KEY);
const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'portfolio_admin_session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect Admin API Routes
  if (pathname.startsWith('/api/admin')) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'غير مصرح لك بالوصول. يرجى تسجيل الدخول.' },
        { status: 401 }
      );
    }

    try {
      await jwtVerify(token, key, { algorithms: ['HS256'] });
    } catch {
      return NextResponse.json(
        { success: false, message: 'انتهت صلاحية الجلسة. يرجى إعادة تسجيل الدخول.' },
        { status: 401 }
      );
    }
  }

  // Protect Admin Dashboard Pages (except /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      await jwtVerify(token, key, { algorithms: ['HS256'] });
    } catch {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If already logged in and visiting /admin/login, redirect to /admin
  if (pathname === '/admin/login') {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (token) {
      try {
        await jwtVerify(token, key, { algorithms: ['HS256'] });
        return NextResponse.redirect(new URL('/admin', request.url));
      } catch {
        // Token invalid, let user proceed to login
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
