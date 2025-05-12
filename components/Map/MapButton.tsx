import Link from 'next/link'
import { BiSolidMap } from 'react-icons/bi'

export function MapButton() {
  return (
    <Link
      href={'/map'}
      className="flex w-fit gap-2 items-center text-sm bg-black rounded-full text-white px-5 py-3.5 shadow-sm hover:shadow-lg mx-auto sticky bottom-12"
    >
      지도로 숙소 탐색하기 <BiSolidMap className="text-xs" />
    </Link>
  )
}
