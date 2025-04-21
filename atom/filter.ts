import { atom } from 'jotai'

import { FilterType, FilterValue } from '@/interface/filter'
import dayjs from 'dayjs'

export const filterTypeState = atom<FilterType | null>(null)

export const filterValueState = atom<FilterValue>({
  location: '',
  checkIn: '',
  checkOut: '',
  guest: 0,
  category: '',
})

export const calculatedFilterState = atom((get) => {
  const filter = get(filterValueState)

  const checkInDate = filter.checkIn ? dayjs(filter.checkIn) : dayjs()
  const checkOutDate = filter.checkOut ? dayjs(filter.checkOut) : dayjs()
  const guestCount = filter.guest || 1
  const dayCount = checkOutDate.diff(checkInDate, 'days')

  return { guestCount, dayCount }
})
