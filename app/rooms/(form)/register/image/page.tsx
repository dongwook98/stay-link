'use client'

import { roomFormState } from '@/atom/form'
import { useRouter } from 'next/navigation'
import { useAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import toast from 'react-hot-toast'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { AiFillCamera } from 'react-icons/ai'
import { useForm } from 'react-hook-form'

import Stepper from '@/components/Form/Stepper'
import NextButton from '@/components/Form/NextButton'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

interface RoomImageProps {
  images?: string[]
}

const IMAGE_URLS = [
  'https://loremflickr.com/500/500/hotel?lock=2398148622286848',
  'https://loremflickr.com/500/500/travel?lock=46018368372736',
  'https://loremflickr.com/500/500/nature?lock=7854363563261952',
  'https://loremflickr.com/500/500/building?lock=7014313585803264',
]

export default function RoomRegisterImage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [roomForm, setRoomForm] = useAtom(roomFormState)
  const [images, setImages] = useState<string[] | null>(null)
  console.log('🚀 ~ RoomRegisterImage ~ images:', images)
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RoomImageProps>()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (!files) return

    Array.from(files).forEach((file: File) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onloadend = (event: ProgressEvent<FileReader>) => {
        const { result } = event.target as FileReader
        if (result) {
          setImages((prevImages) =>
            prevImages
              ? [...prevImages, result?.toString()]
              : [result?.toString()],
          )
        }
      }
    })
  }

  // 클라우디너리 업로드 함수
  async function uploadImagesToCloudinary(images: string[] | null) {
    const uploadedImageUrls: string[] = []

    if (!images) return

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`
    const cloudinaryPreset = `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}` // 클라우디너리의 업로드 프리셋을 여기에 입력하세요.

    for (const imageFile of images) {
      const formData = new FormData()
      formData.append('file', imageFile)
      formData.append('upload_preset', cloudinaryPreset)
      formData.append(
        'public_id',
        `${session?.user.id}/${roomForm?.title}/${uuidv4()}`,
      )

      try {
        // 클라우디너리 API로 이미지 업로드
        const response = await axios.post(cloudinaryUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        uploadedImageUrls.push(response.data.secure_url) // 업로드된 이미지 URL 저장
      } catch (error) {
        console.error('Error uploading images to Cloudinary:', error)
      }
    }

    return uploadedImageUrls
  }

  const onSubmit = async (data: RoomImageProps) => {
    try {
      setDisableSubmit(true)
      uploadImagesToCloudinary(images)
        .then(async (imageUrls) => {
          const result = await axios.post('/api/rooms', {
            ...roomForm,
            images: imageUrls,
          })

          if (result.status === 200) {
            toast.success('숙소를 등록했습니다.')
            setRoomForm(RESET)
            router.push('/')
          } else {
            toast.error('데이터 생성중 문제가 발생했습니다.')
          }
        })
        .catch((error) => {
          console.error(error)
          toast.error('이미지 저장중에 문제가 발생했습니다. 다시 시도해주세요')
        })
    } catch (e) {
      setDisableSubmit(false)
      console.log(e)
      toast.error('다시 시도해주세요')
    }
  }

  return (
    <>
      <Stepper count={5} />
      <form
        className="mt-10 flex flex-col gap-6 px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-semibold text-lg md:text-2xl text-center">
          숙소의 사진을 추가해주세요
        </h1>
        <p className="text-sm md:text-base text-gray-500 text-center">
          숙소 사진은 최대 5장까지 추가할 수 있습니다.
        </p>
        <div className="flex flex-col gap-2">
          <div className="col-span-full">
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <AiFillCamera className="mx-auto h-12 w-12 text-gray-300" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-rose-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-rose-600 focus-within:ring-offset-2 hover:text-rose-500"
                  >
                    <span>최대 5장의 사진을</span>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      className="sr-only"
                      {...register('images', { required: true })}
                      onChange={handleFileUpload}
                    />
                  </label>
                  <p className="pl-1">업로드 해주세요</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF 등 이미지 포맷만 가능
                </p>
              </div>
            </div>
          </div>
          {errors?.images && errors?.images?.type === 'required' && (
            <span className="text-red-600 text-sm">필수 항목입니다.</span>
          )}
        </div>
        {/* 이미지 미리보기 */}
        <div className="mt-10 max-w-lg mx-auto flex flex-wrap gap-4">
          {images &&
            images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="미리보기"
                width={100}
                height={100}
                className="rounded-md"
              />
            ))}
        </div>
        <NextButton
          type="submit"
          text="완료"
          disabled={isSubmitting || disableSubmit}
        />
      </form>
    </>
  )
}
