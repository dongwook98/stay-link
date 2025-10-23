'use server'

import { authOptions } from '@/lib/auth'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import { getServerSession } from 'next-auth'

/**
 * Cloudinary에서 이미지들을 삭제하는 서버 사이드 함수
 * 서버 사이드 함수로 만든 이유: 민감한 정보와 보안 키를 다루기 때문
 *
 * @param imageKeys - 삭제할 이미지의 유니크한 값 배열
 * @param roomTitle - 이미지가 저장된 숙소의 제목(폴더 경로 일부로 사용됨)
 */
export async function deleteImagesFromCloudinary(
  imageKeys: string[],
  roomTitle: string,
) {
  const session = await getServerSession(authOptions)

  // 세션이 없거나 사용자 ID가 없는 경우 삭제 작업 중단
  if (!session || !session.user?.id) {
    console.error('세션이 유효하지 않습니다.')
    return
  }

  if (!imageKeys || imageKeys.length === 0) return

  // Cloudinary API 인증 정보와 타임스탬프 준비
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY!
  const apiSecret = process.env.CLOUDINARY_API_SECRET!
  const timestamp = Math.floor(new Date().getTime() / 1000)

  // 이미지 키 배열을 순회하며 각각 삭제 처리
  for (const imageKey of imageKeys) {
    // 이미지의 고유한 public_id 생성 (Cloudinary 업로드 경로 기준)
    const publicId = `staylink/uploads/${session?.user?.id}/${roomTitle}/${imageKey}`

    // Cloudinary 삭제 요청을 위한 서명 생성
    const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
    const signature = CryptoJS.SHA1(stringToSign).toString()

    // 요청에 필요한 form 데이터 구성
    const formData = new FormData()
    formData.append('public_id', publicId)
    formData.append('api_key', apiKey)
    formData.append('timestamp', timestamp.toString())
    formData.append('signature', signature)

    // Cloudinary의 image/destroy API를 호출하여 이미지 삭제 시도
    try {
      await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
        formData,
      )
    } catch (error) {
      console.error('Cloudinary 삭제 실패:', error)
    }
  }
}
