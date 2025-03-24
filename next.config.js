/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/ansx/website/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
