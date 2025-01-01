export const VIEW_OPTIONS = [
  { value: '', label: 'Chọn thời gian', disabled: true },
  { value: 'day', label: 'Theo ngày' },
  { value: 'month', label: 'Theo tháng' },
  { value: 'year', label: 'Theo năm' },
] as const

export const CHART_SERIES = [
  { key: 'totalPaid', color: 'blue', label: 'Doanh thu' },
  { key: 'totalRefund', color: 'red', label: 'Hoàn tiền' },
  { key: 'totalShippingFee', color: 'green', label: 'Phí vận chuyển' },
  { key: 'totalSubTotal', color: 'orange', label: 'Tổng' },
] as const
