import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// next-auth middleware를 proxy 함수로 감싼 형태
export default async function proxy(request: NextRequest) {
  const session = await getServerSession() // 현재 사용자 세션 가져오기

  const protectedPaths = [
    '/users/mypage',
    '/users/info',
    '/users/edit',
    '/users/likes',
    '/users/comments',
    '/users/rooms',
    '/users/bookings',
    '/payments',
    '/rooms/register',
  ]

  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  )

  // 보호된 경로인데 세션이 없으면 로그인 페이지로 이동
  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 나머지는 그대로 통과
  return NextResponse.next()
}
