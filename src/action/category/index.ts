import { Category } from '@/types/clientypes'
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const fetchCategories = async () => {
  const res = await fetch(`${BASE_URL}/api/category/list-category-client`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  })

  const data = await res.json()

  return data.data as Category[]
}
