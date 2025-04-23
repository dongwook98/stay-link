import RoomEditForm from '@/components/Form/RoomEditForm'
import { Room } from '@/interface/room'

interface ParamsProps {
  params: { id: string }
}

export default async function RoomEdit({ params }: ParamsProps) {
  const id = params.id
  const data: Room = await getRoomDetail(id)

  return <RoomEditForm data={data} />
}

async function getRoomDetail(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rooms?id=${id}`,
    {
      cache: 'no-cache',
    },
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
