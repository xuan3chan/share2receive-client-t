const priceFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'decimal',
})

export const formatPrice = (number: number) => priceFormatter.format(number)

export const truncateText = (text: string, maxLength: number) => {
  if (text?.length <= maxLength) return text
  return text?.substring(0, maxLength) + '...'
}
