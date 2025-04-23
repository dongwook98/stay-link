export const RoomEditField = [
  'title',
  'category',
  'desc',
  'bedroomDesc',
  'price',
  'address',
  'images',
  'imageKeys',
  'freeCancel',
  'selfCheckIn',
  'officeSpace',
  'hasMountainView',
  'hasShampoo',
  'hasFreeLaundry',
  'hasAirConditioner',
  'hasWifi',
  'hasBarBeQue',
  'hasFreeParking',
]

export interface RoomFeatureProps {
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

interface FieldProps {
  field: keyof RoomFeatureProps
  label: string
}

export const FeatureFormField: FieldProps[] = [
  { field: 'freeCancel', label: '무료 취소' },
  { field: 'selfCheckIn', label: '셀프 체크인' },
  { field: 'officeSpace', label: '사무시설' },
  { field: 'hasMountainView', label: '마운틴 뷰' },
  { field: 'hasShampoo', label: '욕실 용품' },
  { field: 'hasFreeLaundry', label: '무료 세탁' },
  { field: 'hasAirConditioner', label: '에어컨' },
  { field: 'hasWifi', label: '무료 와이파이' },
  { field: 'hasBarBeQue', label: '바베큐 시설' },
  { field: 'hasFreeParking', label: '무료 주차' },
]

export const FORM_URL = {
  CATEGORY: '/rooms/register/category',
  INFO: '/rooms/register/info',
  ADDRESS: '/rooms/register/address',
  FEATURE: '/rooms/register/feature',
  IMAGE: '/rooms/register/image',
}
