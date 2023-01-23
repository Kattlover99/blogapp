/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  swcMinify: true,
  output: "standalone",
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = nextConfig;
