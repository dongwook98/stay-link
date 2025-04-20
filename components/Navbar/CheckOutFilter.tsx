import Calendar from 'react-calendar'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'

import { DetailFilterType, FilterValue } from '.'

interface FilterComponentProps {
  filterValue: FilterValue
  setFilterValue: React.Dispatch<React.SetStateAction<FilterValue>>
  setDetailFilter: React.Dispatch<React.SetStateAction<DetailFilterType | null>>
}

export const CheckOutFilter = ({
  filterValue,
  setFilterValue,
  setDetailFilter,
}: FilterComponentProps) => {
  const onChange = (e: any) => {
    setFilterValue({ ...filterValue, checkOut: dayjs(e).format('YYYY-MM-DD') })
    setDetailFilter('guest')
  }

  return (
    <div className="absolute top-[19rem] sm:top-[70px] border border-gray-200 px-8 py-10 flex flex-col bg-white w-full mx-auto inset-x-0 sm:max-w-3xl sm:w-[780px] rounded-xl">
      <div className="text-sm font-semibold">체크아웃 날짜 설정하기</div>
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
    </div>
  )
}
