import { Payment } from './payment'
import { Room } from './room'
import { User } from './user'

export interface Booking {
  id: number
  roomId: number
  userId: string
  checkIn: string
  checkOut: string
  guestCount: number
  totalAmount: number
  totalDays: number
  status: 'SUCCESS' | 'CANCEL'
  room: Room
  user: User
  createAt: string
  updatedAt: string
  payments?: Payment[]
}
