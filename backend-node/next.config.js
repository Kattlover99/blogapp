/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  Host: {
    CORS: "*",
  },
};

module.exports = nextConfig;
