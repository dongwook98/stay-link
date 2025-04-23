import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

import prisma from '@/utils/db'
import axios from 'axios'

// 숙소 조회 API
// my params가 true일 경우 나의 숙소 리스트 조회
// 페이지네이션 지원
// id params가 있을경우 상세 숙소 정보 조회
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page') as string
  const limit = searchParams.get('limit') as string
  const id = searchParams.get('id') as string
  // 내가 만든 숙소만 가져오기
  const my = searchParams.get('my') as string

  const session = await getServerSession(authOptions)

  if (id) {
    // 상세 페이지 로직
    const room = await prisma.room.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        likes: {
          where: session ? { userId: session?.user?.id } : {},
        },
        comments: true, // 댓글 데이터까지 포함
      },
    })

    return NextResponse.json(room, {
      status: 200,
    })
  }

  if (my) {
    // 내가 등록한 숙소 무한 스크롤 로직
    if (!session?.user) {
      return NextResponse.json(
        { error: 'unauthorized user' },
        {
          status: 401,
        },
      )
    }

    const count = await prisma.room.count({
      where: {
        userId: session?.user?.id,
      },
    })
    const skipPage = parseInt(page) - 1

    const rooms = await prisma.room.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        userId: session?.user.id,
      },
      take: parseInt(limit),
      skip: skipPage * parseInt(limit),
    })

    return NextResponse.json(
      {
        page: parseInt(page),
        data: rooms,
        totalCount: count,
        totalPage: Math.ceil(count / parseInt(limit)),
      },
      {
        status: 200,
      },
    )
  }

  if (page) {
    // 무한 스크롤 로직
    const count = await prisma.room.count()
    const skipPage = parseInt(page) - 1
    const rooms = await prisma.room.findMany({
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip: skipPage * parseInt(limit),
    })

    return NextResponse.json(
      {
        page: parseInt(page),
        data: rooms,
        totalCount: count,
        totalPage: Math.ceil(count / parseInt(limit)),
      },
      { status: 200 },
    )
  }

  const data = await prisma.room.findMany()

  return NextResponse.json(data, {
    status: 200,
  })
}

// 숙소 등록 API
export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: 'unauthorized user' }, { status: 401 })
  }

  // 데이터 생성 처리
  const formData = await req.json()
  const headers = {
    Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
  }

  const { data } = await axios.get(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
      formData.address,
    )}`,
    {
      headers,
    },
  )

  const result = await prisma.room.create({
    data: {
      ...formData,
      price: parseInt(formData.price),
      userId: session?.user?.id,
      lat: data.documents[0].y,
      lng: data.documents[0].x,
    },
  })

  return NextResponse.json(result, { status: 200 })
}

// 숙소 수정 API
export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id') as string
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: 'unauthorized user' }, { status: 401 })
  }

  // 데이터 수정을 처리한다
  const formData = await req.json()
  const headers = {
    Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
  }

  const { data } = await axios.get(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
      formData.address,
    )}`,
    {
      headers,
    },
  )

  const result = await prisma.room.update({
    where: {
      id: parseInt(id),
    },
    data: {
      ...formData,
      price: parseInt(formData.price),
      userId: session?.user?.id,
      updatedAt: new Date(),
      lat: data.documents[0].y,
      lng: data.documents[0].x,
    },
  })

  return NextResponse.json(result, { status: 200 })
}

/**
 * 숙소 삭제 API
 * @param req
 * @returns
 */
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id') as string
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: 'unauthorized user' }, { status: 401 })
  }

  // 데이터를 삭제한다
  if (id) {
    const result = await prisma.room.delete({
      where: {
        id: parseInt(id),
      },
    })

    return NextResponse.json(result, { status: 200 })
  }

  return NextResponse.json(null, { status: 500 })
}
