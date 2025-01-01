export type statisticType = {
  date: string
  paidUUIDs: string[]
  refundedUUIDs: string[]
  summary: {
    totalSubTotal: number
    totalShippingFee: number
    totalRefund: number
    totalPaid: number
  }
}

export type Summary = {
  totalSubTotal: number
  totalShippingFee: number
  totalRefund: number
  totalPaid: number
}

export type StatisticSellerType = {
  dailyDetails: statisticType[]
  allSummary: Summary
}
