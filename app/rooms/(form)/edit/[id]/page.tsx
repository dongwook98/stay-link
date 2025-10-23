import RoomEditForm from '@/components/Form/RoomEditForm'
import { Room } from '@/interface/room'

type Params = Promise<{ id: string }>

export default async function RoomEdit({ params }: { params: Params }) {
  const id = (await params).id
  const data: Room = await getRoomDetail(id)

  return <RoomEditForm data={data} />
}

async function getRoomDetail(id: string) {
  try {
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
  } catch (error) {
    console.error(error)
  }
}
