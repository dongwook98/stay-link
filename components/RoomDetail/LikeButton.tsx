import { Room } from '@/interface/room'
import { CiHeart } from 'react-icons/ci'

import { toast } from 'react-hot-toast'

export default function LikeButton({ data }: { data: Room }) {
  const toggleLike = () => {
    // TODO /api/like POST 로직 추가
    toast.success('찜 목록에 추가했습니다.')
  }

  return (
    <button
      onClick={toggleLike}
      type="button"
      className="flex gap-2 items-center px-2 py-1.5 rounded-lg hover:bg-black/10"
    >
      <CiHeart />
      <span className="underline">저장</span>
    </button>
  )
}
