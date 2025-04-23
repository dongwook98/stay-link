import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import MainLayout from '@/components/MainLayout'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://stay-link.vercel.app'),
  alternates: {
    canonical: '/',
  },
  title: 'StayLink로 여행하기',
  description: 'StayLink로 여행을 계획해보세요.',
  keywords: ['StayLink', '여행', '숙소', '호텔', '펜션', '최저가'],
  openGraph: {
    title: 'StayLink로 여행하기',
    description: 'StayLink로 여행을 계획해보세요',
    url: 'https://stay-link.vercel.app',
    siteName: 'StayLink',
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  )
}
