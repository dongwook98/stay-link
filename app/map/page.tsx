'use client'

import { useState } from 'react'

import Map from '@/components/Map'
import { Room } from '@/interface/room'
import SelectedRoom from '@/components/Map/SelectedRoom'

export default function MapPage() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  return (
    <>
      <Map setSelectedRoom={setSelectedRoom} />
      <SelectedRoom
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
      />
    </>
  )
}
