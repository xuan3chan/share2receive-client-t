import axiosClient from '@/lib/axios'
import { AddToCartData, Cart } from '@/types/cart'

const cartService = {
  addToCart: async (data: AddToCartData, success?: () => void, errorMessage?: (message: string) => void) => {
    try {
      return await axiosClient.post('/api/cart', data).then((res) => {
        if (success) {
          success()
        }
        return res.data
      })
    } catch (error: any) {
      if (error) {
        if (errorMessage) {
          errorMessage(error.response?.data.message)
        }
      }
    }
  },

  getCart: (): Promise<Cart> => axiosClient.get('/api/cart'),

  deleteCartItem: async (id: string, success?: () => void, errorMessage?: (message: string) => void) => {
    try {
      return await axiosClient.delete(`/api/cart/${id}`).then(() => success && success())
    } catch (error: any) {
      if (error) {
        if (errorMessage) {
          errorMessage(error.response?.data.message)
        }
      }
    }
  },

  updateQuantity: async (
    id: string,
    amount: number,
    success?: () => void,
    errorMessage?: (message: string) => void,
  ) => {
    axiosClient
      .put(`/api/cart/${id}`, { amount })
      .then(() => success && success())
      .catch((error: any) => {
        if (error) {
          if (errorMessage) {
            errorMessage(error.response?.data.message)
          }
        }
      })
  },
}

export default cartService

// import axiosClient from '@/lib/axios'
// import { AddToCartData, Cart } from '@/types/cart'

// const cartService = {
//   addToCart: async (data: AddToCartData, errorMessage: (message: string) => void) => {
//     try {
//       return await axiosClient.post('/api/cart', data)
//     } catch (error: any) {
//       if (error.response?.status === 400) {
//         errorMessage(error.response?.data.message)
//       }
//     }
//   },

//   getCart: async (): Promise<Cart> => {
//     try {
//       return await axiosClient.get('/api/cart')
//     } catch (error) {
//       throw new Error('Không thể tải giỏ hàng. Vui lòng thử lại.')
//     }
//   },

//   deleteCartItem: async (id: string) => {
//     try {
//       return await axiosClient.delete(`/api/cart/${id}`)
//     } catch (error) {
//       throw new Error('Không thể xóa sản phẩm khỏi giỏ hàng.')
//     }
//   },
// }

// export default cartService
