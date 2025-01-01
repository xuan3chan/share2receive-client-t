export interface SummaryData {
  totalPaid: number
  totalRefund: number
  totalShippingFee: number
  totalSubTotal: number
}

export interface DataPoint {
  date: string
  paidUUIDs: string[]
  refundedUUIDs: string[]
  summary: SummaryData
}
