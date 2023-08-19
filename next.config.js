/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

module.exports = nextConfig;
