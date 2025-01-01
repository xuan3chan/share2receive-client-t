import { RequestRefund } from './orderTypes'

export type Sell = {
  _id: string
  orderId: {
    _id: string
    paymentStatus: string
    userId: {
      _id: string
      firstname: string
      lastname: string
      email: string
    }
    phone: string
    address: string
    createdAt: string | Date
  }
  sellerId: string
  subTotal: number
  products: [
    {
      _id: string
      subOrderId: string
      productId: {
        _id: string
        imgUrls: string[]
      }
      productName: string
      quantity: number
      price: number
      size: string
      color: string
    },
  ]
  rating: {
    comment: string
    rating: number
  }
  shippingService: 'GHN' | 'GHTK' | 'agreement'
  shippingFee: number
  note: string | null
  requestRefund: null | RequestRefund
  status: string
  createdAt: string
  updatedAt: string
  subOrderUUID: string
}

export type SellType = {
  data: Sell[]
  pagination: {
    totalOrders: number
  }
}
