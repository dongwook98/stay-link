export enum PaymentStatus {
  READY = 'READY',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_FOR_DEPOSIT = 'WAITING_FOR_DEPOSIT',
  DONE = 'DONE',
  CANCELED = 'CANCELED',
  PARTIAL_CANCELED = 'PARTIAL_CANCELED',
  ABORTED = 'ABORTED',
  EXPIRED = 'EXPIRED',
}

export interface Payment {
  id: string
  paymentKey: string
  bookingId: string
  amount: number
  status: PaymentStatus
  orderId: string
  orderName: string
  approvedAt: string
  mId?: string
  receiptUrl?: string
  cardNumber?: string
  method?: string
}
