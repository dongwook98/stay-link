import { BLUR_DATA_URL } from '@/constants/placeholder'
import { Room } from '@/interface/room'
import Image from 'next/image'
import Link from 'next/link'

export function RoomItem({ room }: { room: Room }) {
  return (
    <div key={room.id}>
      <Link href={`/rooms/${room.id}`}>
        <div className="h-[320px] md:h-[240px] overflow-hidden relative z-0">
          <Image
            src={room?.images?.[0]}
            alt={room.title}
            fill
            placeholder="blur"
            sizes="(min-width: 640px) 240px, 320px"
            blurDataURL={BLUR_DATA_URL}
            className="rounded-md w-full h-auto object-cover hover:shadow-lg"
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
      </Link>
    </div>
  )
}
