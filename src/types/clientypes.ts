export type Category = {
  _id: string
  name: string
  description: string
  status: string
  type: string
  imgUrl: string
  priority: string
  totalProduct: number
}

export type Brand = {
  _id: string
  name: string
  totalProduct: number
  description: string
  status: string
  slug: string
  imgUrl: string
  priority: string
}
