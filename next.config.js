/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: process.env.NODE_ENV === 'production' ? '/tools/language-demographics' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/tools/language-demographics' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
