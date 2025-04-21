import { atom } from 'jotai'

import { LocationType } from '@/interface/map'
import { Room } from '@/interface/room'
import { DEFAULT_LAT, DEFAULT_LNG, ZOOM_LEVEL } from '@/constants/map'

/**
 * 사용자가 선택한 숙소 상태
 */
export const selectedRoomState = atom<Room | null>(null)

/**
 * 지도 줌, 위도, 경도 상태
 */
export const locationState = atom<LocationType>({
  lat: DEFAULT_LAT,
  lng: DEFAULT_LNG,
  zoom: ZOOM_LEVEL,
})
