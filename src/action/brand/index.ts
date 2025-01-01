'use server'
import { Brand } from '@/types/clientypes'

const BASEURL = process.env.NEXT_PUBLIC_API_URL

export const fetchBrand = async () => {
  const res = await fetch(`${BASEURL}/api/brand/list-brand-client`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await res.json()

  return data.data as Brand[]
}
