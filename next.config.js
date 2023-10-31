const withNextIntl = require("next-intl/plugin")();
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
