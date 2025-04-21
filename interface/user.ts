import { Booking } from './booking'
import { Comment } from './comment'
import { Room } from './room'

export interface User {
  id: number
  email: string
  name?: string
  image?: string
  desc?: string
  rooms?: Room[]
  accounts: Account[]
  address?: string
  phone?: string
  comments?: Comment[]
  bookings?: Booking[]
}

interface Account {
  id: string
  provider: string
}
