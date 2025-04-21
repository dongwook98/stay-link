import { NextResponse } from 'next/server'

import prisma from '@/utils/db'

export async function GET() {
  const data = await prisma.room.findMany()

  return NextResponse.json(data, {
    status: 200,
  })
}
