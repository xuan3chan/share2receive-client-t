export type AddToCartData = {
  productId: string
  size: string
  color: string
  amount: number
}

type Product = {
  _id: string
  productName: string
  imgUrls: string[]
  userId: string
  isDeleted: boolean
  status: string
}

export type CartItem = {
  _id: string
  userId: string
  productId: Product
  size: string
  color: string
  amount: number
  price: number
  total: number
  isCheckedOut: boolean
  createdAt: string
  updatedAt: string
}

export type Cart = {
  data: CartItem[]
  summary: {
    totalAmount: number
    totalTypes: number
    totalPrice: number
  }
}
