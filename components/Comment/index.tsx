import { Room } from '@/interface/room'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

export default function Comment({ data }: { data: Room }) {
  return (
    <div className="border-b border-gray-300 py-8 px-4">
      <CommentList />
      <CommentForm />
    </div>
  )
}
