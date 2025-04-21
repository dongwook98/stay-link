'use client'
import { Room } from '@/interface/room'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
/*global kakao*/

import Script from 'next/script'
import { SetStateAction } from 'react'

declare global {
  interface Window {
    kakao: any
  }
}

const DEFAULT_LAT = 37.565337
const DEFAULT_LNG = 126.9772095
const ZOOM_LEVEL = 7

export default function Map({
  setSelectedRoom,
}: {
  setSelectedRoom: React.Dispatch<SetStateAction<Room | null>>
}) {
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

        // 마커 이미지 설정
        const imageSrc = '/images/marker-icon.png'
        const imageSize = new window.kakao.maps.Size(30, 30)
        const imageOption = { offset: new window.kakao.maps.Point(16, 46) }

        // 마커 이미지를 생성합니다
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption,
        )

        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        })

        // 마커가 지도 위에 표시되도록 설정
        marker.setMap(map)

        // custom overlay를 설정
        const content = `<div class="custom_overlay">${room.price?.toLocaleString()}원</div>`

        // custom overlay를 생성
        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
        })

        // 커스텀 오버레이가 지도 위에 표시되도록 설정
        customOverlay.setMap(map)

        // 마커에 클릭 이벤트를 등록
        window.kakao.maps.event.addListener(marker, 'click', function () {
          setSelectedRoom(room)
        })

        window.kakao.maps.event.addListener(map, 'click', function () {
          setSelectedRoom(null)
        })
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
