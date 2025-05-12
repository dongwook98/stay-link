'use client'

import { Fragment, useEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useAtomValue } from 'jotai'
import { filterValueState } from '@/atom/filter'

import CategoryList from '@/components/CategoryList'
import Loader from '@/components/Loader'
import { GridLayout } from '@/components/RoomList/GridLayout'
import { RoomItem } from '@/components/RoomList/RoomItem'
import { Room } from '@/interface/room'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { LoaderGrid } from '@/components/LoaderGrid'
import { MapButton } from '@/components/Map/MapButton'
import EmptyRoomList from '@/components/RoomList/EmptyRoomList'

export default function Home() {
  const observerRef = useRef<HTMLDivElement | null>(null)
  const observerEntry = useIntersectionObserver(observerRef, {})
  const isPageEnd = !!observerEntry?.isIntersecting
  const filterValue = useAtomValue(filterValueState)

  const filterParams = {
    location: filterValue.location,
    category: filterValue.category,
  }

  const getRooms = async ({ pageParam = 1 }) => {
    const { data } = await axios('/api/rooms', {
      params: {
        limit: 12,
        page: pageParam,
        ...filterParams,
      },
    })

    return data
  }

  const {
    data: rooms,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['rooms', filterParams],
    queryFn: ({ pageParam }) => getRooms({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage?.data?.length > 0 ? lastPage.page + 1 : undefined,
  })

  if (isError) {
    throw new Error('Room API Fetching Error')
  }

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined

    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNextPage()
      }, 500)
    }

    return () => clearTimeout(timerId)
  }, [fetchNextPage, hasNextPage, isPageEnd])

  const isEmpty =
    !isLoading && rooms?.pages?.every((page) => page?.data?.length === 0)

  return (
    <>
      <CategoryList />

      {isEmpty && <EmptyRoomList />}
      {!isEmpty && (
        <GridLayout>
          {(isLoading || isFetching) && !isFetchingNextPage ? (
            <LoaderGrid />
          ) : (
            rooms?.pages?.map((page, index) => (
              <Fragment key={index}>
                {page?.data?.map((room: Room) => (
                  <RoomItem room={room} key={room.id} />
                ))}
              </Fragment>
            ))
          )}
        </GridLayout>
      )}
      <MapButton />
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div ref={observerRef} className="w-full touch-none h-10 mb-10" />
    </>
  )
}
