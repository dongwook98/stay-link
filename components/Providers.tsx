'use client'

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import toast, { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'

interface Props {
  children: React.ReactNode
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.error('전역 쿼리 에러 발생:', error)

      if (query.state.data !== undefined) {
        // 기존에 데이터가 있는 상태에서 에러난 것 (예: refetch 중 실패)
        toast.error('데이터를 새로 불러오는 데 문제가 생겼습니다.')
      } else {
        // 초기 로딩부터 실패한 경우
        toast.error('데이터를 불러오지 못했습니다.')
      }
    },
  }),
})

function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        {children}
        <Toaster />
      </SessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Providers
