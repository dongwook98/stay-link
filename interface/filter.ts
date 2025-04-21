export type FilterType = 'location' | 'checkIn' | 'checkOut' | 'guest'

export interface FilterValue {
  location: string
  checkIn: string
  checkOut: string
  guest: number
  category: string
}
