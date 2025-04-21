'use client'
import React, { useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'

import { RoomItem } from '@/components/RoomList/RoomItem'
import { GridLayout } from '@/components/RoomList/GridLayout'
import { Like } from '@/interface/like'
import Loader from '@/components/Loader'
import { LoaderGrid } from '@/components/LoaderGrid'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'

export default function UserLikes() {
  const observerRef = useRef<HTMLDivElement | null>(null)
  const observerEntry = useIntersectionObserver(observerRef, {})
  const isPageEnd = !!observerEntry?.isIntersecting
  const { data: session } = useSession()

  const fetchLikes = async ({ pageParam = 1 }) => {
    const { data } = await axios('/api/likes?page=' + pageParam, {
      params: {
        limit: 12,
        page: pageParam,
      },
    })
    return data
  }

  const {
    data: likes,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [`likes-user-${session?.user.id}`],
    queryFn: fetchLikes,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage?.data?.length > 0 ? lastPage.page + 1 : undefined,
  })

  if (isError) {
    throw new Error('Like API Fetching Error')
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

  return (
    <>
      <h1 className="font-semibold text-lg md:text-2xl max-w-7xl mx-auto">
        찜한 숙소 리스트
      </h1>
      <div className="mt-2 text-gray-500 max-w-7xl mx-auto">
        찜한 숙소 리스트입니다.
      </div>
      <GridLayout>
        {isLoading || isFetching ? (
          <LoaderGrid />
        ) : (
          likes?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page?.data?.map((like: Like) => (
                <RoomItem room={like.room} key={like.id} />
              ))}
            </React.Fragment>
          ))
        )}
      </GridLayout>
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={observerRef} />
    </>
  )
}
