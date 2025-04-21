import { atom } from 'jotai'

import { FilterType, FilterValue } from '@/interface/filter'

export const filterTypeState = atom<FilterType | null>(null)

export const filterValueState = atom<FilterValue>({
  location: '',
  checkIn: '',
  checkOut: '',
  guest: 0,
  category: '',
})
