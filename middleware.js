import { NextResponse } from 'next/server';

// Auth gate for the billing portal. Pages under /invoices trust this check.
export function middleware(req) {
  if (!req.cookies.get('larkspur_session')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ['/invoices/:path*'] };
