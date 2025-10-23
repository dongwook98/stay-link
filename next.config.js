/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true, // 서버 액션 기능 활성화
  },
  images: {
    remotePatterns: [
      {
        hostname: 'picsum.photos',
      },
      {
        hostname: 'loremflickr.com',
      },
      {
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
