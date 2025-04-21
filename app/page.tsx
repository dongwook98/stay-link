import CategoryList from '@/components/CategoryList'
import { GridLayout } from '@/components/RoomList/GridLayout'
import { RoomItem } from '@/components/RoomList/RoomItem'
import { Room } from '@/interface/room'

export default async function Home() {
  const data: Room[] = await getRooms()

  return (
    <>
      <CategoryList />
      <GridLayout>
        {data?.map((room) => <RoomItem room={room} key={room.id} />)}
      </GridLayout>
    </>
  )
}

async function getRooms() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms`, {
    cache: 'force-cache', // SSG
  })

  if (!res.ok) {
    throw new Error('failed to fetch')
  }

  return res.json()
}
