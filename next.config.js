/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.chop.tdmd.co.uk",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
