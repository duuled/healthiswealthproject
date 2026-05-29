/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Allow external image domains if you add photography later
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Performance: compress output
  compress: true,

  // Enforce trailing slashes for SEO consistency
  trailingSlash: false,
};

module.exports = nextConfig;
