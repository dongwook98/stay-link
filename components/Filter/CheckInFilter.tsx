import Calendar from 'react-calendar'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { useAtom } from 'jotai'

import { filterTypeState, filterValueState } from '@/atom/filter'
import FilterLayout from './FilterLayout'

export const CheckInFilter = () => {
  const [filterValue, setFilterValue] = useAtom(filterValueState)
  const [filterType, setFilterType] = useAtom(filterTypeState)

  const onChange = (e: any) => {
    setFilterValue({
      ...filterValue,
      checkIn: dayjs(e).format('YYYY-MM-DD'),
    })
    setFilterType('checkOut')
  }

  return (
    <FilterLayout
      title="체크인 날짜 설정하기"
      isShow={filterType === 'checkIn'}
    >
      <Calendar
        next2Label={null}
        prev2Label={null}
        className="mt-8 mx-auto"
        onChange={onChange}
        minDate={new Date()}
        defaultValue={
          filterValue.checkIn ? new Date(filterValue.checkIn) : null
        }
        formatDay={(locale, date) => dayjs(date).format('DD')}
      />
    </FilterLayout>
  )
}
