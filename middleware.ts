import { NextResponse, type NextRequest } from 'next/server';

// SPA-style rewrite — every URL except real Next.js routes (api, embed,
// internal, static assets) gets sent to the home page so the AppContext
// can read the pathname and switch the active tab. Replaces the regex
// rewrite in next.config.js which path-to-regexp wasn't honouring on
// edge correctly (it was catching /embed/clientele and breaking the
// dashboard iframe).
const PASS_THROUGH = /^\/(api|embed|widgets|_next|favicon|icon|us-states-10m|robots|sitemap)/;
const STATIC_FILE  = /\.(?:json|png|jpg|jpeg|svg|webp|ico|woff2?|css|js|map|txt|xml|webmanifest)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Real route — let it through untouched
  if (pathname === '/' || PASS_THROUGH.test(pathname) || STATIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  // Everything else (e.g. /worksheet, /admin, /resources) — rewrite to /
  // so the existing SPA shell renders. Client-side AppContext reads
  // window.location.pathname and sets the active tab from there.
  return NextResponse.rewrite(new URL('/', req.url));
}

export const config = {
  // Match everything; the function body decides whether to rewrite or pass.
  // Earlier path-to-regexp matchers with negative lookahead were unreliable
  // on the edge — explicit allow-list inside the function is safer.
  matcher: ['/((?!_next).*)'],
};
