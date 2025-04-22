'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import {
  loadTossPayments,
  ANONYMOUS,
  TossPaymentsWidgets,
} from '@tosspayments/tosspayments-sdk'
import { useSession } from 'next-auth/react'
import { v4 as uuidv4 } from 'uuid'

import { toast } from 'react-hot-toast'
import axios from 'axios'

import Loader from '@/components/Loader'

const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm'

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const price = searchParams.get('totalAmount') || '0'
  const customerKey = searchParams.get('customerKey') || uuidv4()
  const totalDays = searchParams.get('totalDays') || '0'
  const roomTitle = searchParams.get('roomTitle') || 'StayLink'
  const bookingId = searchParams.get('bookingId')
  // const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null)
  // const paymentMethodsWidgetRef = useRef<ReturnType<
  //   PaymentWidgetInstance['renderPaymentMethods']
  // > | null>(null)
  const [amount, setAmount] = useState(parseInt(price))
  const [ready, setReady] = useState(false)
  console.log('🚀 ~ PaymentPage ~ ready:', ready)
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null)

  useEffect(() => {
    async function fetchPaymentWidgets() {
      // ------  결제위젯 초기화 ------
      const tossPayments = await loadTossPayments(clientKey)
      // 회원 결제
      const widgets = tossPayments.widgets({
        customerKey,
      })
      // 비회원 결제
      // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

      setWidgets(widgets)
    }

    fetchPaymentWidgets()
  }, [clientKey, customerKey])

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return
      }
      // ------ 주문의 결제 금액 설정 ------
      await widgets.setAmount({
        value: parseInt(price),
        currency: 'KRW',
      })

      await Promise.all([
        // ------  결제 UI 렌더링 ------
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        }),
        // ------  이용약관 UI 렌더링 ------
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ])

      setReady(true)
    }

    renderPaymentWidgets()
  }, [widgets])

  useEffect(() => {
    if (widgets == null) {
      return
    }

    widgets.setAmount({
      value: amount,
      currency: 'KRW',
    })
  }, [widgets, amount])

  return (
    <div className="max-w-2xl mx-auto px-4 my-20">
      <div className="flex flex-col gap-2 mt-4">
        <h1 className="text-lg md:text-2xl font-semibold">확인 및 결제</h1>
        <p className="text-gray-600 mb-4">
          결제 수단을 선택하고 결제를 진행해주세요. 환불금은 예약 취소 후 2~3일
          내에 결제한 카드로 입금됩니다. 동의하시는 경우에만 아래 버튼을 눌러
          예약을 결제하세요.
        </p>
        {!ready && <Loader />}
        {/* 결제 UI */}
        <div id="payment-method" />
        {/* 이용약관 UI */}
        <div id="agreement" />
        {/* 쿠폰 체크박스 */}
        <div className="w-full">
          <div>
            <label htmlFor="coupon-box" className="flex gap-2 items-center">
              <input
                id="coupon-box"
                type="checkbox"
                aria-checked="true"
                disabled={!ready}
                onChange={(event) => {
                  // ------  주문서의 결제 금액이 변경되었을 경우 결제 금액 업데이트 ------
                  setAmount(
                    event.target.checked ? amount - 5_000 : amount + 5_000,
                  )
                }}
              />
              <span>5,000원 쿠폰 적용</span>
            </label>
          </div>
        </div>

        {/* 결제하기 버튼 */}
        <button
          type="button"
          className="mt-8 bg-rose-600 hover:bg-rose-500 text-white rounded-md px-5 py-2.5"
          disabled={!ready}
          onClick={async () => {
            try {
              const uniqueOrderId = uuidv4()
              // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
              // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
              // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
              await axios.post('/api/payments', {
                bookingId: bookingId,
                amount: amount,
                status: 'IN_PROGRESS',
                orderId: uniqueOrderId,
                orderName: `${roomTitle?.slice(0, 10)}_${totalDays}박`,
              })

              await widgets
                ?.requestPayment({
                  orderId: uniqueOrderId,
                  orderName: `${roomTitle?.slice(0, 10)}_${totalDays}박`,
                  customerEmail: session?.user.email || '',
                  customerName: session?.user.name || '익명',
                  successUrl: window.location.origin + '/payments/success',
                  failUrl: window.location.origin + '/payments/fail',
                })
                .catch(function (error) {
                  // 에러 처리: 에러 목록을 확인하세요
                  // https://docs.tosspayments.com/reference/error-codes#failurl로-전달되는-에러
                  if (error.code === 'USER_CANCEL') {
                    // 결제 고객이 결제창을 닫았을 때 에러 처리
                    toast?.error('결제가 종료되었습니다.')
                  } else if (error.code === 'INVALID_CARD_COMPANY') {
                    // 유효하지 않은 카드 코드에 대한 에러 처리
                    toast?.error('유효하지 않은 카드 코드입니다.')
                  } else {
                    // 그 외의 경우 에러 메세지
                    toast?.error(
                      error?.message || '문제가 생겼습니다. 다시 시도해주세요',
                    )
                  }
                })
            } catch (error) {
              // 에러 처리하기
              console.error(error)
            }
          }}
        >
          {roomTitle} {totalDays}박 {amount}원 결제하기
        </button>
      </div>
    </div>
  )
}
