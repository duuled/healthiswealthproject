/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from common CDNs — add your image host here when ready
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
    ],
  },

  // Strict mode catches subtle React bugs during development
  reactStrictMode: true,

  // Compress static assets
  compress: true,

  // Redirect www → non-www (Vercel handles this automatically, but good to have)
  async redirects() {
    return [];
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
