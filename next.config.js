/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // SPA-style rewrites are now handled in middleware.ts for finer control.
  // /embed/* routes are designed to live inside an iframe on
  // dashboard.roofignite.com — relax the framing policy here.
  async headers() {
    return [
      {
        source: '/embed/:path*',
        headers: [
          // X-Frame-Options is a single token (DENY/SAMEORIGIN/ALLOW-FROM —
          // the last is deprecated). To allow any origin we OMIT it
          // entirely and rely on CSP frame-ancestors below.
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self' https://dashboard.roofignite.com https://*.vercel.app" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
