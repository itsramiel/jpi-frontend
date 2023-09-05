const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./i18n.ts"
);
/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "itsramiel.com",
        port: "",
        pathname: "**",
      },
    ],
  },
});

module.exports = nextConfig;
