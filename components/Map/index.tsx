'use client'
import { Room } from '@/interface/room'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
/*global kakao*/

import Script from 'next/script'

declare global {
  interface Window {
    kakao: any
  }
}

const DEFAULT_LAT = 37.565337
const DEFAULT_LNG = 126.9772095
const ZOOM_LEVEL = 7

export default function Map() {
  const getRooms = async () => {
    const { data } = await axios('/api/rooms')
    return data as Room[]
  }

  const { data: rooms, isSuccess } = useQuery({
    queryKey: ['map-rooms'],
    queryFn: () => getRooms(),
  })

  // @see - https://apis.map.kakao.com/web/documentation/#load
  const loadKakoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map')
      const mapOption = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
        level: ZOOM_LEVEL,
      }

      const map = new window.kakao.maps.Map(mapContainer, mapOption)

      // @see - https://apis.map.kakao.com/web/sample/basicMarker/
      rooms?.map((room) => {
        // 마커 표시될 위치
        const markerPosition = new window.kakao.maps.LatLng(room.lat, room.lng)
        // custom overlay를 설정
        const content = `<div class="custom_overlay">${room.price?.toLocaleString()}원</div>`

        // custom overlay를 생성
        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
        })

        // 커스텀 오버레이가 지도 위에 표시되도록 설정
        customOverlay.setMap(map)
      })
    })
  }
  return (
    <>
      {isSuccess && (
        <Script
          strategy="afterInteractive"
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
          onReady={loadKakoMap}
        />
      )}
      <div id="map" className="w-full h-screen" />
    </>
  )
}
