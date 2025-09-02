import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define which paths are protected (require authentication)
  const isProtectedPath = 
    path.startsWith('/patient/') || 
    path.startsWith('/doctor/');
    
  // Define which paths are public
  const isPublicPath = 
    path.startsWith('/auth/') || 
    path === '/' ||
    path.startsWith('/debug/');
    
  // Get the token from the cookie
  const token = request.cookies.get('token')?.value || '';
  
  // Debug logging
  console.log(`Middleware: Path=${path}, HasToken=${!!token}`);
  
  // If the path is protected and there is no token, redirect to login
  if (isProtectedPath && (!token || token === '')) {
    console.log('Middleware: Protected path with no token, redirecting to login');
    // Store the original path to redirect back after login
    const redirectUrl = new URL('/auth/login', request.url);
    redirectUrl.searchParams.set('redirect', path);
    
    return NextResponse.redirect(redirectUrl);
  }
  
  // If the path is a login/signup page and the user is already logged in,
  // redirect to the appropriate dashboard
  if (path.startsWith('/auth/login') && token && token !== '') {
    console.log('Middleware: Login page with token, redirecting to dashboard');
    // Get the user role from the cookie
    const role = request.cookies.get('userRole')?.value || '';
    
    // Redirect to the appropriate dashboard based on role
    if (role === 'doctor') {
      return NextResponse.redirect(new URL('/doctor/dashboard', request.url));
    } else if (role === 'patient') {
      return NextResponse.redirect(new URL('/patient/dashboard', request.url));
    }
  }
  
  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images folder)
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|images|api).*)',
  ],
};

// Make sure this file is treated as a module
export {};
