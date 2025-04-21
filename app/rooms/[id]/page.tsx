import FeatureSection from '@/components/RoomDetail/FeatureSection'
import HeaderSection from '@/components/RoomDetail/HeaderSection'
import { Room } from '@/interface/room'

export default async function RoomDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const data: Room = await getRoomDetail(id)

  return (
    <div className="mt-8 mb-20 max-w-6xl mx-auto">
      <HeaderSection data={data} />
      <FeatureSection data={data} />
    </div>
  )
}

async function getRoomDetail(id: string) {
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
}
