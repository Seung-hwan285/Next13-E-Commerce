/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    domains: ['lh3.googleusercontent.com', 'cdn.chec.io'],
  },
};

module.exports = nextConfig;
