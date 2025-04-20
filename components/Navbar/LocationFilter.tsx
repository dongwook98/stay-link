import cn from 'classnames'
import { DetailFilterType, FilterValue } from '.'

interface FilterComponentProps {
  filterValue: FilterValue
  setFilterValue: React.Dispatch<React.SetStateAction<FilterValue>>
  setDetailFilter: React.Dispatch<React.SetStateAction<DetailFilterType | null>>
}

export const LocationFilter = ({
  filterValue,
  setFilterValue,
  setDetailFilter,
}: FilterComponentProps) => {
  return (
    <div className="absolute top-[19rem] sm:top-[70px] border border-gray-200 px-8 py-10 flex flex-col bg-white w-full mx-auto inset-x-0 sm:max-w-3xl sm:w-[780px] rounded-xl">
      <div className="text-sm font-semibold">지역으로 검색하기</div>
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
                setDetailFilter('checkIn')
              }}
            >
              {value}
            </button>
          ),
        )}
      </div>
    </div>
  )
}
