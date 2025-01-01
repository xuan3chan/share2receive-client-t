import axiosClient from '@/lib/axios'
import { StatisticSellerType } from '@/types/statisticType'

type getEcoOfUserType = {
  totalWeight: number
}

export type productToCartType = {
  productId: string
  productName: string
  imgUrls: string[]
  timesAdded: number
}

export type getTimeAddToCartType = {
  data: productToCartType[]
  totalAdd: number
}

const statisticService = {
  getStatisticForSeller: async (startDate?: string, endDate?: string, viewBy?: string) => {
    const params = {
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(viewBy && { viewBy }),
    }

    const res: StatisticSellerType = await axiosClient.get('/api/statistics/get-static-saller', {
      params,
    })
    return res
  },

  getEcoOfUser: async (): Promise<getEcoOfUserType> => axiosClient.get('/api/statistics/get-static-eco-of-user'),

  getEcoOfAllUser: async (): Promise<getEcoOfUserType> => axiosClient.get('/api/statistics/get-static-eco-all'),

  getTotalTimeUserAddtoCart: async (): Promise<getTimeAddToCartType> =>
    axiosClient.get('/api/statistics/get-time-add-cart'),
}

export default statisticService
