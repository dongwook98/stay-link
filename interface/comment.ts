import { Room } from './room'
import { User } from './user'

export interface Comment {
  id: number
  createdAt: string
  roomId: number
  userId: string
  body: string
  room: Room
  user: User
}

export interface CommentApiType {
  totalCount: number
  data: Comment[]
  page?: number
  totalPage?: number
}
