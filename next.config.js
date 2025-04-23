/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true, // 서버 액션 기능 활성화
  },
  images: {
    remotePatterns: [
      {
        hostname: 'loremflickr.com',
      },
      {
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

module.exports = nextConfig
