'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import { getServerSession } from 'next-auth'

export async function deleteImagesFromCloudinary(
  imageKeys: string[],
  roomTitle: string,
) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.id) {
    console.error('세션이 유효하지 않습니다.')
    return
  }

  if (!imageKeys || imageKeys.length === 0) return

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY!
  const apiSecret = process.env.CLOUDINARY_API_SECRET!
  const timestamp = Math.floor(new Date().getTime() / 1000)

  for (const imageKey of imageKeys) {
    const publicId = `staylink/uploads/${session?.user?.id}/${roomTitle}/${imageKey}`
    const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
    const signature = CryptoJS.SHA1(stringToSign).toString()
    const formData = new FormData()
    formData.append('public_id', publicId)
    formData.append('api_key', apiKey)
    formData.append('timestamp', timestamp.toString())
    formData.append('signature', signature)

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
