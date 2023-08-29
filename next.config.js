const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./i18n.ts"
);
/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // TODO: change to cms
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "dovecconstruction.com", // TODO: change to cms
        port: "",
        pathname: "**",
      },
    ],
  },
});

module.exports = nextConfig;
