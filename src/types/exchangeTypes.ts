export type CreateExchangeType = {
  requestProduct: {
    productId: string
    size: string
    colors: string
    amount: number
  }
  receiveProduct: {
    productId: string
    size: string
    colors: string
    amount: number
  }
  note?: string
}

type Rating = {
  _id: string
  userId: string
  targetId: string
  targetType: string
  rating: number
  comment: string
  createdAt: string | Date
  updatedAt: string | Date
}

export type Exchange = {
  _id: string
  requesterId: {
    _id: string
    firstname: string
    lastname: string
    email: string
    avatar: string
  }
  receiverId: {
    _id: string
    firstname: string
    lastname: string
    email: string
    avatar: string
  }
  requestProduct: {
    requesterProductId: {
      _id: string
      productName: string
      imgUrls: string[]
    }
    size: string
    colors: string
    amount: number
  }
  receiveProduct: {
    receiverProductId: {
      _id: string
      productName: string
      imgUrls: string[]
    }
    size: string
    colors: string
    amount: number
    _id: string
  }
  receiverStatus: {
    exchangeStatus: 'pending' | 'shipping' | 'completed' | 'canceled'
    confirmStatus: 'pending' | 'confirmed'
    statusDate: string | Date
    _id: string
  }
  requestStatus: {
    exchangeStatus: 'pending' | 'shipping' | 'completed' | 'canceled'
    confirmStatus: 'pending' | 'confirmed'
    statusDate: string | Date
    _id: string | Date
  }
  allExchangeStatus: 'pending' | 'accepted' | 'rejected' | 'completed' | 'canceled'
  shippingMethod: string
  note: string
  completedAt: string | Date
  createdAt: string | Date
  updatedAt: string | Date
  role: 'requester' | 'receiver'
  ratings?: {
    requesterRating: Rating | null
    receiverRating: Rating | null
  }
}

export type ExchangeType = {
  total: number
  data: Exchange[]
}
