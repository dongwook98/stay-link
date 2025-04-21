import Calendar from 'react-calendar'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { useAtom } from 'jotai'

import FilterLayout from './FilterLayout'
import { filterTypeState, filterValueState } from '@/atom/filter'

export const CheckOutFilter = () => {
  const [filterValue, setFilterValue] = useAtom(filterValueState)
  const [filterType, setFilterType] = useAtom(filterTypeState)

  const onChange = (e: any) => {
    setFilterValue({
      ...filterValue,
      checkOut: dayjs(e).format('YYYY-MM-DD'),
    })
    setFilterType('guest')
  }

  return (
    <FilterLayout
      title="체크아웃 날짜 설정하기"
      isShow={filterType === 'checkOut'}
    >
      <Calendar
        className="mt-8 mx-auto"
        onChange={onChange}
        minDate={
          filterValue.checkIn ? new Date(filterValue.checkIn) : new Date()
        }
        defaultValue={
          filterValue.checkOut ? new Date(filterValue.checkOut) : null
        }
        formatDay={(locale, date) => dayjs(date).format('DD')}
      />
    </FilterLayout>
  )
}
