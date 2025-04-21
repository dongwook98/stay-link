'use client'

import { useQuery } from '@tanstack/react-query'

import CategoryList from '@/components/CategoryList'
import Loader from '@/components/Loader'
import { GridLayout } from '@/components/RoomList/GridLayout'
import { RoomItem } from '@/components/RoomList/RoomItem'
import { Room } from '@/interface/room'

export default function Home() {
  const getRooms = async () => {
    const res = await fetch('/api/rooms')
    if (!res.ok) {
      throw new Error('failed to fetch')
    }
    return res.json()
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ['rooms'],
    queryFn: () => getRooms(),
  })

  return (
    <>
      <CategoryList />
      {isLoading ? (
        <Loader className="mt-60 mb-40" />
      ) : (
        <GridLayout>
          {data?.map((room: Room) => <RoomItem room={room} key={room.id} />)}
        </GridLayout>
      )}
    </>
  )
}
