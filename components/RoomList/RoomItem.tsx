import { Room } from '@/interface/room'
import { useState } from 'react'

export function RoomItem({ room }: { room: Room }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div key={room.id}>
      {/* 이미지 컨테이너: 비율 고정 */}
      <div className="relative w-full pb-[66.66%] overflow-hidden rounded-md bg-gray-100">
        <img
          src={room?.images?.[0]}
          alt={room.title}
          onLoad={() => setIsLoaded(true)}
          className={`
            absolute top-0 left-0 w-full h-full object-cover
            transition-opacity duration-200
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        />
      </div>

      <div className="mt-2 font-semibold text-sm">{room.title}</div>
      <span className="text-xs px-2 py-1 rounded-full bg-black text-white mt-1">
        {room.category}
      </span>
      <div className="mt-1 text-gray-400 text-sm">{room.address}</div>
      <div className="mt-1 text-sm">
        {room?.price?.toLocaleString()}원{' '}
        <span className="text-gray-500"> /박</span>
      </div>
    </div>
  )
}
