'use client'

import { Fragment, useEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

import axios from 'axios'

import CategoryList from '@/components/CategoryList'
import Loader from '@/components/Loader'
import { GridLayout } from '@/components/RoomList/GridLayout'
import { RoomItem } from '@/components/RoomList/RoomItem'
import { Room } from '@/interface/room'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { LoaderGrid } from '@/components/LoaderGrid'
import { MapButton } from '@/components/Map/MapButton'

export default function Home() {
  const observerRef = useRef<HTMLDivElement | null>(null)
  const observerEntry = useIntersectionObserver(observerRef, {})
  const isPageEnd = !!observerEntry?.isIntersecting

  const getRooms = async ({ pageParam = 1 }) => {
    const { data } = await axios('/api/rooms', {
      params: {
        limit: 12,
        page: pageParam,
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
    queryKey: ['rooms'],
    queryFn: ({ pageParam }) => getRooms({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
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
  }, [fetchNextPage, hasNextPage, isPageEnd])

  return (
    <>
      <CategoryList />
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
      <MapButton />
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div ref={observerRef} className="w-full touch-none h-10 mb-10" />
    </>
  )
}
