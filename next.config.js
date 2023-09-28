/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "dist",
  skipTrailingSlashRedirect: true,
  trailingSlash: true,
};

module.exports = nextConfig;
