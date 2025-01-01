import axiosClient from '@/lib/axios'
import { CreateRatingType, RatingType } from '@/types/rating'

const ratingService = {
  create: async (data: CreateRatingType, success?: () => void, errorMessage?: (message: string) => void) => {
    try {
      return await axiosClient.post('/api/rating', data).then(() => success && success())
    } catch (error: any) {
      if (error) {
        if (errorMessage) {
          errorMessage(error.response?.data.message)
        }
      }
    }
  },

  getRating: async (targetId: string): Promise<void> => {
    await axiosClient.get(`/api/rating/get-list-detail-rating?targetId=${targetId}`)
  },

  getRatingByUserId: async (userId: string): Promise<RatingType[]> => {
    const response: RatingType[] = await axiosClient.get(`/api/rating/get-list-rating-of-user?userId=${userId}`)

    return response
  },
}

export default ratingService
