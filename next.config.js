/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    // Catch-all rewrite for the SPA — but skip routes that are real Next.js
    // pages we want to serve directly (e.g. /embed/clientele, anything under
    // /api). Otherwise the home shell intercepts them.
    return [
      {
        source: '/:path((?!api|embed|_next|favicon|icon|us-states-10m|.*\\.(?:json|png|jpg|jpeg|svg|webp|ico|woff2?|css|js)).*)',
        destination: '/',
      },
    ];
  },
  // The /embed/* routes are designed to live inside an iframe on
  // dashboard.roofignite.com — relax the framing policy for those.
  async headers() {
    return [
      {
        source: '/embed/:path*',
        headers: [
          { key: 'X-Frame-Options',         value: 'ALLOWALL' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self' https://dashboard.roofignite.com https://*.vercel.app" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
