import { Booking } from './booking'
import { Comment } from './comment'
import { Like } from './like'
import { User } from './user'

export interface Room {
  id: number
  images: string[]
  title: string
  address: string
  desc?: string
  bedroomDesc?: string
  price: number
  category: string
  lat: string
  lng: string
  user?: User
  userId?: number
  freeCancel: boolean
  selfCheckIn: boolean
  officeSpace: boolean
  hasMountainView: boolean
  hasShampoo: boolean
  hasFreeLaundry: boolean
  hasAirConditioner: boolean
  hasWifi: boolean
  hasBarBeQue: boolean
  hasFreeParking: boolean
  likes?: Like[]
  comments?: Comment[]
  bookings?: Booking[]
}

export interface RoomForm {
  images?: string[]
  title?: string
  address?: string
  desc?: string
  bedroomDesc?: string
  price?: number
  category?: string
  lat?: string
  lng?: string
  userId?: number
  freeCancel?: boolean
  selfCheckIn?: boolean
  officeSpace?: boolean
  hasMountainView?: boolean
  hasShampoo?: boolean
  hasFreeLaundry?: boolean
  hasAirConditioner?: boolean
  hasWifi?: boolean
  hasBarBeQue?: boolean
  hasFreeParking?: boolean
}
