'use client'

import dynamic from 'next/dynamic'
import Loader from '../Loader'

/**
 * - SSR 방지
 */
const MapSection = dynamic(() => import('./MapSection'), {
  loading: () => <Loader />,
  ssr: false,
})

export default MapSection
