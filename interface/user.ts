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
}

interface Account {
  id: string
  provider: string
}
