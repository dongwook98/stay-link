import { Room } from './room'

export interface Like {
  id: number
  roomId: number
  userId: number
  createdAt: string
  room: Room
}
