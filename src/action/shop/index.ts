'use server'

import { ProductsClient, ProductSClientList } from '@/types/users/productTypes'
import { forEach } from 'lodash'
const BASEURL = process.env.NEXT_PUBLIC_API_URL

export const fetchAllProdClient = async (
  page?: number,
  limit?: number,
  filterCategory?: string[],
  filterBrand?: string[],
  filterStartPrice?: number,
  filterEndPrice?: number,
  filterSize?: string[],
  filterColor?: string[],
  filterMaterial?: string[],
  filterCondition?: string[],
  filterType?: string[],
  filterStyle?: string[],
  filterTypeCategory?: string[],
  searchKey?: string,
) => {
  const params = new URLSearchParams()

  if (page !== undefined) params.append('page', page.toString())
  if (limit !== undefined) params.append('limit', limit.toString())
  if (filterCategory) {
    forEach(filterCategory, (value) => {
      params.append('filterCategory', value)
    })
  }
  if (filterBrand) {
    forEach(filterBrand, (value) => {
      params.append('filterBrand', value)
    })
  }
  if (filterStartPrice !== undefined) params.append('filterStartPrice', filterStartPrice.toString())
  if (filterEndPrice !== undefined) params.append('filterEndPrice', filterEndPrice.toString())
  if (filterSize) {
    forEach(filterSize, (value) => {
      params.append('filterSize', value)
    })
  }
  if (filterColor) {
    forEach(filterColor, (value) => {
      params.append('filterColor', value)
    })
  }
  if (filterMaterial) {
    forEach(filterMaterial, (value) => {
      params.append('filterMaterial', value)
    })
  }
  if (filterCondition) {
    forEach(filterCondition, (value) => {
      params.append('filterCondition', value)
    })
  }
  if (filterType) {
    forEach(filterType, (value) => {
      params.append('filterType', value)
    })
  }
  if (filterStyle) {
    forEach(filterStyle, (value) => {
      params.append('filterStyle', value)
    })
  }
  if (filterTypeCategory) {
    forEach(filterTypeCategory, (value) => {
      params.append('filterTypeCategory', value)
    })
  }
  if (searchKey) params.append('searchKey', searchKey)

  try {
    const res = await fetch(`${BASEURL}/api/product/list-product-for-client?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      cache: 'no-cache',
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data: ProductSClientList = await res.json()

    return data
  } catch (error) {
    console.error('Failed to fetch products:', error)
    throw error
  }
}

export const fetchProductBySlug = async (slug: string) => {
  try {
    const res = await fetch(`${BASEURL}/api/product/get-product-by-slug/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data = await res.json()

    return data.data as ProductsClient
  } catch (error) {
    console.error('Failed to fetch product:', error)
    throw error
  }
}
