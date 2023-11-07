/** @type {import('next').NextConfig} */

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'svg'],
  experimental: {
    mdxRs: true,
    appDir: true,
    serverActions: true,
    serverActionsBodySizeLimit: '2mb',
  },

  // test
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.svg'],
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    domains: ['lh3.googleusercontent.com', 'cdn.chec.io'],
    minimumCacheTTL: 60,
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [576, 640, 750, 1080, 1200, 1920],
    formats: ['image/avif', 'image/webp'],
  },
  testEnvironment: 'node',
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = nextConfig;
// module.exports = withBundleAnalyzer;
