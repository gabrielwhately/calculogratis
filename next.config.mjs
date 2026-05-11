/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  skipTrailingSlashRedirect: true,
  distDir: '.next',
  swcMinify: true,
}

export default nextConfig
