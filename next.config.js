/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    formats: ['image/webp']
  }
}

module.exports = nextConfig
