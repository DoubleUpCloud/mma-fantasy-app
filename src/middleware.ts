import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define which routes require authentication
const protectedRoutes = [
  '/predictions',
  '/profile',
  '/leaderboard',
];

// Define which routes are only for non-authenticated users
const authRoutes = [
  '/auth/login',
  '/auth/register',
];

export function middleware(request: NextRequest) {
  // Get the path from the request
  const path = request.nextUrl.pathname;
  
  // Check if the user is logged in by looking for the 'is-logged' cookie
  const isLoggedIn = request.cookies.get('is-logged')?.value === 'true';
  
  // If the user is trying to access a protected route but is not logged in
  if (protectedRoutes.some(route => path.startsWith(route)) && !isLoggedIn) {
    // Redirect to login page
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  // If the user is trying to access an auth route but is already logged in
  if (authRoutes.some(route => path.startsWith(route)) && isLoggedIn) {
    // Redirect to dashboard
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Otherwise, continue with the request
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};