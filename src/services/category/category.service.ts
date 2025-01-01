import axiosClient from '@/lib/axios'
import { Category } from '@/types/clientypes'

const categoryService = {
  gellClientCategories: async (): Promise<Category[]> => {
    const res = await axiosClient.get('/api/category/list-category-client')

    return res.data
  },
}

export default categoryService
