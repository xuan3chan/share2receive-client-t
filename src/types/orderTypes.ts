export type UpdateAddressOrder = {
  address: string
  phone: string
  type: string
}

export type CreateOrderNow = {
  productId: string
  quantity: number
  size: string
  color: string
}

export type CreateOrderRes = {
  message: string
  order: Order
}

type User = {
  _id: string
  firstname: string
  lastname: string
  email: string
  avatar: string
  address: string
  phone: string
}

export type Product = {
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
  rating: {
    comment: string
    rating: number
  }
}

export type RequestRefund = {
  status: string
  bankingNumber: string
  bankingName: string
  bankingNameUser: string
  bankingBranch: string
  reason: string
  _id: string
}

export type SubOrder = {
  _id: string
  orderId: string
  sellerId: {
    _id: string
    firstname: string
    lastname: string
    avatar: string
    email: string
    phone: string
    address: string
  }
  subTotal: number
  products: Product[]
  status: string
  orderUUID: string
  subOrderUUID: string
  shippingService: string
  shippingFee: number
  note: string | null
  requestRefund: RequestRefund | null
}

export type DataOrder = {
  _id: string
  userId: User
  phone: string
  address: string
  totalAmount: number
  paymentStatus: string
  transactionId: string | null
  orderUUID: string
  type: string
  subOrders: SubOrder[]
  createdAt: string | Date
  updatedAt: string | Date
}

export type Order = {
  _id: string
  userId: User
  phone: string
  address: string
  totalAmount: number
  paymentStatus: string
  transactionId: string | null
  type: string
  subOrders: SubOrder[]
  createdAt: string | Date
  updatedAt: string | Date
  orderUUID: string
  summary: {
    totalAmount: number
    totalTypes: number
    totalPrice: number
    totalShippingFee: number
  }
}

export type OrderById = {
  data: DataOrder
  summary: {
    totalAmount: number
    totalTypes: number
    totalPrice: number
    totalShippingFee: number
  }
}

export type Orders = {
  data: Order[]
  pagination: {
    currentPage: number
    totalPages: number
    totalOrders: number
  }
}
