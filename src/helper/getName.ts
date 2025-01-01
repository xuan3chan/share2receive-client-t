'use client'
import { useClient } from '@/hooks/useClient'
import { colorData } from '@/metadata/colorData'
import { materialData } from '@/metadata/materialData'
import { clothingStylesData } from '@/metadata/styleData'
import { useRouter, useSearchParams } from 'next/navigation'

export const useGetName = () => {
  const { categories, brands } = useClient()
  const router = useRouter()
  const param = useSearchParams()

  const getAddress = (address: string) => {
    const addressParts = address.split(', ')
    const [provinceName, districtName, wardName, street] = addressParts
    if (street) return `${street}, ${wardName}, ${districtName}, ${provinceName}`
    return `${wardName}, ${districtName}, ${provinceName}`
  }

  const getShippingServiceName = (string: string) => {
    switch (string) {
      case 'GHN':
        return 'Giao hàng nhanh'
      case 'GHTK':
        return 'Giao hàng tiết kiệm'
      case 'agreement':
        return 'Theo thỏa thuận'
      default:
        return string
    }
  }

  const getOrderStatusName = (string: string) => {
    switch (string) {
      case 'pending':
        return 'Chờ xử lý'
      case 'canceled':
        return 'Đã hủy'
      case 'shipping':
        return 'Đang giao hàng'
      case 'completed':
        return 'Đã nhận hàng'
      case 'delivered':
        return 'Đã giao hàng'
      default:
        return string
    }
  }

  const getOrderPaymentName = (string: string) => {
    switch (string) {
      case 'pending':
        return 'Chờ thanh toán'
      case 'paid':
        return 'Đã thanh toán'
      case 'canceled':
        return 'Đã hủy'
      case 'PayPickup':
        return 'Thanh toán khi nhận hàng'
      case 'failed':
        return 'Thanh toán thất bại'
      default:
        return string
    }
  }

  const getColorPaymentName = (string: string) => {
    switch (string) {
      case 'paid':
        return '#88C273'
      case 'PayPickup':
        return '#F29F58'
      default:
        return '#FF0000'
    }
  }

  const getTypeCategory = (string: string) => {
    switch (string) {
      case 'male':
        return 'Thời trang nam'
      case 'female':
        return 'Thời trang nữ'
      case 'unisex':
        return 'Thời trang unisex'
      case 'other':
        return 'Khác'
      case 'item':
        return 'Phụ kiện'
      default:
        return string
    }
  }

  // Helper function to find name by id in categories or brands
  const getCategoryName = (id: string) => {
    const category = categories?.find((cat) => cat._id === id)
    return category ? category.name : id
  }

  const getBrandName = (id: string) => {
    const brand = brands?.find((br) => br._id === id)
    return brand ? brand.name : id
  }

  const getMaterialName = (id: string) => {
    const material = materialData.find((mat) => mat.value === id)
    return material ? material.name : id
  }

  const getColorName = (id: string) => {
    const color = colorData.find((col) => col.value === id)
    return color ? color.name : id
  }

  const getPriceRange = (startPrice: string, endPrice: string) => {
    const start = parseInt(startPrice)
    const end = parseInt(endPrice)

    if (start === 0 && end === 100000) return 'Dưới 100k'
    if (start === 100000 && end === 200000) return '100k - 200k'
    if (start === 200000 && end === 500000) return '200k - 500k'
    if (start === 500000 && end === 1000000) return '500k - 1tr'
    if (start === 1000000 && end === 50000000) return 'Trên 1tr'
    if (start === 1 && end === 19000) return 'Đồng giá 19k'
  }

  const getConditionName = (id: string) => {
    switch (id) {
      case 'new':
        return 'Mới'
      case 'used':
        return 'Đã sử dụng'
      default:
        return id
    }
  }

  const getTypeProduct = (id: string) => {
    switch (id) {
      case 'barter':
        return 'Trao đổi'
      case 'sale':
        return 'Bán'
      default:
        return id
    }
  }

  const getStyleName = (id: string) => {
    const style = clothingStylesData.find((st) => st.value === id)
    return style ? style.name : id
  }

  // Function to handle tag removal
  const removeTag = (key: string, value: string) => {
    const currentParams = new URLSearchParams(param.toString())

    // Remove the value from the current key
    const values = currentParams.getAll(key).filter((v) => v !== value)

    // If no values are left for the key, delete the key
    if (values.length === 0) {
      currentParams.delete(key)
    } else {
      currentParams.delete(key) // Remove existing key
      values.forEach((v) => currentParams.append(key, v)) // Add remaining values
    }

    // Update the URL without refreshing the page
    router.replace(`?${currentParams.toString()}`)
  }

  const removeTwoTags = (key1: string, value1: string, key2: string, value2: string) => {
    const currentParams = new URLSearchParams(param.toString())

    // Remove the value from the current key
    const values1 = currentParams.getAll(key1).filter((v) => v !== value1)
    const values2 = currentParams.getAll(key2).filter((v) => v !== value2)

    // If no values are left for the key, delete the key
    if (values1.length === 0) {
      currentParams.delete(key1)
    } else {
      currentParams.delete(key1) // Remove existing key
      values1.forEach((v) => currentParams.append(key1, v)) // Add remaining values
    }

    if (values2.length === 0) {
      currentParams.delete(key2)
    } else {
      currentParams.delete(key2) // Remove existing key
      values2.forEach((v) => currentParams.append(key2, v)) // Add remaining values
    }

    // Update the URL without refreshing the page
    router.replace(`?${currentParams.toString()}`)
  }

  // Function to clear all filters
  const clearAll = () => {
    const currentParams = new URLSearchParams()

    // Update the URL to remove all parameters
    router.replace(`?${currentParams.toString()}`)
  }

  return {
    getCategoryName,
    getBrandName,
    getMaterialName,
    getColorName,
    getPriceRange,
    getConditionName,
    getTypeProduct,
    getStyleName,
    removeTag,
    removeTwoTags,
    clearAll,
    getTypeCategory,
    getOrderStatusName,
    getOrderPaymentName,
    getShippingServiceName,
    getAddress,
    getColorPaymentName,
  }
}

export const getAllExchangeStatusName = (string: string) => {
  switch (string) {
    case 'pending':
      return 'Chờ xử lý'
    case 'accepted':
      return 'Đã chấp nhận'
    case 'canceled':
      return 'Đã hủy'
    case 'completed':
      return 'Đã hoàn thành'
    case 'rejected':
      return 'Đã bị từ chối'
    default:
      return string
  }
}
