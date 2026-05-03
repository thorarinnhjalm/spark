import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['is', 'en'];
const defaultLocale = 'is';

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  
  // Exclude static files, API routes, and internal Next.js files from middleware
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') || 
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect if there is no locale
  // We can eventually add language negotiation here based on Accept-Language headers
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  
  // Redirect to the URL with the default locale
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
  ],
};
