import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // IMPORTANT: Ensure your route names here match your file structure!
  // Use 'admin-dashboard' and 'student-dashboard' if those are your folder names.
  const publicPaths = ['/', '/signin', '/signup'];
  const isPublic = publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  // Retrieve JWT token from cookies
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const userRole = token?.role || token?.user?.role;

  // --- 1. If Logged In, Redirect from Sign In/Sign Up ---
  if (token && (pathname.startsWith('/signin') || pathname.startsWith('/signup'))) {
    let redirectPath = '/';
    if (userRole === 'admin') redirectPath = '/admin-dashboard';
    else if (userRole === 'student') redirectPath = '/student-dashboard';
    
    const dashboardUrl = req.nextUrl.clone();
    dashboardUrl.pathname = redirectPath;
    return NextResponse.redirect(dashboardUrl);
  }

  // Allow access to public paths
  if (isPublic) {
    return NextResponse.next();
  }

  // --- 2. Redirect Unauthenticated Users ---
  if (!token) {
    console.log(`[MIDDLEWARE] No token found. Redirecting to /signin from ${pathname}`);
    const signinUrl = req.nextUrl.clone();
    signinUrl.pathname = '/signin';
    signinUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signinUrl);
  }

  // --- 3. Role Mismatch Checks ---
  
  // A. Block admin-only routes from non-admins (e.g., student trying to access admin)
  if (pathname.startsWith('/admin-dashboard') && userRole !== 'admin') {
    console.log(`[MIDDLEWARE] User with role ${userRole} tried to access admin dashboard. Redirecting.`);
    const dashboardUrl = req.nextUrl.clone();
    dashboardUrl.pathname = '/student-dashboard'; // Send student to student dashboard
    return NextResponse.redirect(dashboardUrl);
  }

  // B. Block student-only routes from non-students (e.g., admin trying to access student)
  if (pathname.startsWith('/student-dashboard') && userRole !== 'student') {
    console.log(`[MIDDLEWARE] User with role ${userRole} tried to access student dashboard. Redirecting.`);
    const dashboardUrl = req.nextUrl.clone();
    dashboardUrl.pathname = '/admin-dashboard'; // Send admin to admin dashboard
    return NextResponse.redirect(dashboardUrl);
  }

  // Allow access if all checks pass
  return NextResponse.next();
}

// Apply middleware only to protected paths (and signin/signup for redirection logic)
export const config = {
  matcher: [
    '/', 
    '/signin', 
    '/signup', 
    '/admin-dashboard/:path*', 
    '/student-dashboard/:path*'
  ],
};