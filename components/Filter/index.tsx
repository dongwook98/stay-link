import { CheckInFilter } from './CheckInFilter'
import { CheckOutFilter } from './CheckOutFilter'
import { GuestFilter } from './GuestFilter'
import { LocationFilter } from './LocationFilter'

export const SearchFilter = () => {
  return (
    <>
      <LocationFilter />
      <CheckInFilter />
      <CheckOutFilter />
      <GuestFilter />
    </>
  )
}
