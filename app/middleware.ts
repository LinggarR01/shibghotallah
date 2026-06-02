import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const blockedPaths = [
  '/wp-admin',
  '/wp-login.php',
  '/wp-content',
  '/wp-includes',
  '/xmlrpc.php',
  '/wordpress',
  '/wp',
  '/phpmyadmin',
  '/phpMyAdmin',
  '/pma',
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isBlocked = blockedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (isBlocked) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/wp-admin/:path*',
    '/wp-login.php',
    '/wp-content/:path*',
    '/wp-includes/:path*',
    '/xmlrpc.php',
    '/wordpress/:path*',
    '/wp/:path*',
    '/phpmyadmin/:path*',
    '/phpMyAdmin/:path*',
    '/pma/:path*',
  ],
};
