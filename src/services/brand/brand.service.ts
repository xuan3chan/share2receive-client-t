import axiosClient from '@/lib/axios'

import { Brand } from '@/types/clientypes'

const brandService = {
  getBrands: async (): Promise<Brand[]> => {
    const res = await axiosClient.get('/api/brand/list-brand-client')

    return res.data
  },
}

export default brandService
