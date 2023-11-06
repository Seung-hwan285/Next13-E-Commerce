/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
    serverActionsBodySizeLimit: '2mb',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        http: 'empty',
        https: 'empty',
        querystring: 'empty',
      };

      return config;
    }
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'cdn.chec.io'],
  },
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts'
);

// module.exports = withNextIntl;
module.exports = nextConfig;
