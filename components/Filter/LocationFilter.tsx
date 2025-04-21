import cn from 'classnames'
import { useAtom } from 'jotai'

import { filterTypeState, filterValueState } from '@/atom/filter'
import FilterLayout from './FilterLayout'

export const LocationFilter = () => {
  const [filterValue, setFilterValue] = useAtom(filterValueState)
  const [filterType, setFilterType] = useAtom(filterTypeState)

  return (
    <FilterLayout title="지역으로 검색하기" isShow={filterType === 'location'}>
      <div className="flex flex-wrap gap-4 mt-4">
        {['서울', '부산', '대구', '인천', '광주', '대전', '울산']?.map(
          (value) => (
            <button
              key={value}
              type="button"
              className={cn(
                'border rounded-lg px-5 py-2.5 hover:bg-gray-200 focus:bg-rose-500',
                {
                  'bg-rose-600 text-white': filterValue.location === value,
                },
              )}
              onClick={() => {
                setFilterValue({
                  ...filterValue,
                  location: value,
                })
                setFilterType('checkIn')
              }}
            >
              {value}
            </button>
          ),
        )}
      </div>
    </FilterLayout>
  )
}
