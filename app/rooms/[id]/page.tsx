import type { Metadata, ResolvingMetadata } from 'next'

import Comment from '@/components/Comment'
import FeatureSection from '@/components/RoomDetail/FeatureSection'
import HeaderSection from '@/components/RoomDetail/HeaderSection'
import MapSection from '@/components/RoomDetail/MapSection'
import { Room } from '@/interface/room'

interface Props {
  params: {
    id: string
  }
}

export default async function RoomDetailPage({ params }: Props) {
  const { id } = params
  const data: Room = await getRoomDetail(id)

  return (
    <div className="mt-8 mb-20 max-w-6xl mx-auto">
      <HeaderSection data={data} />
      <FeatureSection data={data} />
      <Comment room={data} />
      <MapSection data={data} />
    </div>
  )
}

async function getRoomDetail(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/rooms?id=${id}`,
      {
        next: {
          revalidate: 60 * 60, // ISR
        },
      },
    )

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json()
  } catch (error) {
    console.error(error)
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.id

  // fetch data
  const room = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rooms?id=${id}`,
    {
      next: {
        revalidate: 60 * 60,
      },
    },
  ).then((res) => res.json())

  // optionally access and extend (rather than replace) parent metadata
  const prevKeywords = (await parent)?.keywords || []

  return {
    title: `StayLink 숙소 - ${room?.title}`,
    description: room?.description,
    keywords: [room?.category, ...prevKeywords],
  }
}
