export type Transaction = {
  _id: string
  amount: number
  orderInfo: string
  orderType: string
  transId: string
  payType: string
  createdAt: string | Date
}

export type TransactionList = {
  data: Transaction[]
  total: number
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
  }
}
