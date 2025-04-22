import { atomWithStorage } from 'jotai/utils'

import { RoomForm } from '@/interface/room'

export const roomFormState = atomWithStorage<RoomForm | null>('roomForm', {
  images: [],
  title: '',
  address: '',
  desc: '',
  bedroomDesc: '',
  price: 0,
  category: '',
  lat: '',
  lng: '',
  userId: 0,
  freeCancel: false,
  selfCheckIn: false,
  officeSpace: false,
  hasMountainView: false,
  hasShampoo: false,
  hasFreeLaundry: false,
  hasAirConditioner: false,
  hasWifi: false,
  hasBarBeQue: false,
  hasFreeParking: false,
})
