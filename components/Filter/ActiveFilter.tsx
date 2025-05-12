import { filterTypeState, filterValueState } from '@/atom/filter'
import cn from 'classnames'
import { useAtom, useAtomValue } from 'jotai'
import React from 'react'
import { SearchFilter } from '.'
import { AiOutlineSearch } from 'react-icons/ai'

function ActiveFilter() {
  const [filterType, setFilterType] = useAtom(filterTypeState)
  const filterValue = useAtomValue(filterValueState)

  return (
    <div className="mt-40 cursor-pointer w-full relative">
      <div className="sm:max-w-3xl flex flex-col sm:flex-row border border-gray-200 rounded-lg py-4 sm:py-2 sm:rounded-full shadow-sm bg-white hover:shadow-lg cursor-pointer justify-between mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-4 w-full relative sm:pl-2">
          <button
            type="button"
            onClick={() => setFilterType('location')}
            className={cn(
              'font-semibold text-xs rounded-full hover:bg-gray-100 py-3 px-6 text-left',
              {
                'shadow bg-white': filterType === 'location',
              },
            )}
          >
            여행지
            <div className="text-gray-500 text-xs">
              {filterValue?.location || '여행지 검색'}
            </div>
          </button>
          <button
            type="button"
            onClick={() => setFilterType('checkIn')}
            className={cn(
              'font-semibold text-xs rounded-full hover:bg-gray-100 py-3 px-6 text-left',
              {
                'shadow bg-white': filterType === 'checkIn',
              },
            )}
          >
            체크인
            <div className="text-gray-500 text-xs">
              {filterValue?.checkIn || '날짜 추가'}
            </div>
          </button>
          <button
            type="button"
            onClick={() => setFilterType('checkOut')}
            className={cn(
              'font-semibold text-xs rounded-full hover:bg-gray-100 py-3 px-6 text-left',
              {
                'shadow bg-white': filterType === 'checkOut',
              },
            )}
          >
            체크아웃
            <div className="text-gray-500 text-xs">
              {filterValue?.checkOut || '날짜 추가'}
            </div>
          </button>
          <button
            type="button"
            onClick={() => setFilterType('guest')}
            className={cn(
              'font-semibold text-xs rounded-full hover:bg-gray-100 py-3 px-6 text-left',
              {
                'shadow bg-white': filterType === 'guest',
              },
            )}
          >
            여행자
            <div className="text-gray-500 text-xs">
              {`${filterValue?.guest} 명` || '게스트 추가'}
            </div>
          </button>
          <SearchFilter />
        </div>
        <button
          type="button"
          className="bg-rose-600 text-white rounded-full h-10 mx-4 sm:w-24 mt-4 sm:mt-2 my-auto flex justify-center gap-1 px-3 py-2 hover:shadow hover:bg-rose-500"
          onClick={() => {
            setFilterType(null)
          }}
        >
          <AiOutlineSearch className="font-semibold text-xl my-auto" />
          <div className="my-auto">검색</div>
        </button>
      </div>
    </div>
  )
}

export default ActiveFilter
