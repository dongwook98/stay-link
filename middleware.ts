export { default } from 'next-auth/middleware'

// 인증 필요한 페이지
export const config = {
  matcher: [
    '/users/mypage',
    '/users/info',
    '/users/edit',
    '/users/likes',
    '/users/comments',
    '/users/bookings/:path*',
  ],
}
