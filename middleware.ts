export { default } from 'next-auth/middleware'

// 인증 필요한 페이지
export const config = { matcher: ['/mypage'] }
