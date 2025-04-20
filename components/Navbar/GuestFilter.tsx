import { useState } from 'react'
import cn from 'classnames'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'

import { DetailFilterType, FilterValue } from '.'

interface FilterComponentProps {
  filterValue: FilterValue
  setFilterValue: React.Dispatch<React.SetStateAction<FilterValue>>
  setDetailFilter: React.Dispatch<React.SetStateAction<DetailFilterType | null>>
}

export const GuestFilter = ({
  filterValue,
  setFilterValue,
  setDetailFilter,
}: FilterComponentProps) => {
  const [counter, setCounter] = useState<number>(filterValue.guest || 0)

  return (
    <div className="absolute top-[19rem] sm:top-[70px] border border-gray-200 px-8 py-10 flex flex-col bg-white w-full mx-auto inset-x-0 sm:max-w-3xl sm:w-[780px] rounded-xl">
      <div className="text-sm font-semibold">게스트 수 추가하기</div>
      <div className="mt-4 border border-gray-200 rounded-lg py-2 px-4 flex justify-between items-center">
        <div>
          <div className="font-semibold text-sm">게스트 수 추가</div>
          <div className="text-gray-500 text-xs">숙박 인원을 입력해주세요</div>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <button
            type="button"
            className="rounded-full w-8 h-8 disabled:border-gray-200 hover:border-black"
            disabled={counter <= 0}
            onClick={() => {
              setCounter((val) => val - 1)
              setFilterValue({
                ...filterValue,
                guest: counter - 1,
              })
            }}
          >
            <AiOutlineMinusCircle
              className={cn('m-auto', {
                'text-gray-200': counter <= 0,
              })}
            />
          </button>
          <div className="w-3 text-center">{counter}</div>
          <button
            type="button"
            className="rounded-full w-8 h-8 disabled:border-gray-200 hover:border-black"
            disabled={counter >= 20}
            onClick={() => {
              setCounter((val) => val + 1)
              setFilterValue({
                ...filterValue,
                guest: counter + 1,
              })
            }}
          >
            <AiOutlinePlusCircle
              className={cn('m-auto', { 'text-gray-200': counter >= 20 })}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
