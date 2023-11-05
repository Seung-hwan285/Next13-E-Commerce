/** @type {import('next').NextConfig} */
const nextConfig = {
  runtime: "edge",
  experimental: {
    appDir: true,
    serverActions: true,
    serverActionsBodySizeLimit: "2mb",
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    domains: ["lh3.googleusercontent.com", "cdn.chec.io"],
  },
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./i18n.ts"
);

module.exports = withNextIntl;
module.exports = nextConfig;
