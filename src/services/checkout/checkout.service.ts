import axiosClient from '@/lib/axios'

export type Success = {
  message: string
  response: {
    partnerCode: string
    orderId: string
    requestId: string
    amount: number
    responseTime: number
    message: string
    resultCode: number
    payUrl: string
    shortLink: string
  }
}

const checkoutService = {
  momoPayment: async (orderId: string, success?: (res: any) => void, error?: (err: any) => void) => {
    try {
      return await axiosClient.post(`/api/checkout/momo/${orderId}`).then((res) => success && success(res))
    } catch (err: any) {
      if (err) {
        if (error) {
          error(err.response.data.message)
        }
      }
    }
  },

  codPayment: async (orderId: string, success?: (res: any) => void, error?: (err: any) => void) => {
    try {
      return await axiosClient
        .post(`/api/checkout/checkoutout-agreement/${orderId}`)
        .then((res) => success && success(res))
    } catch (err: any) {
      if (err) {
        if (error) {
          error(err.response.data.message)
        }
      }
    }
  },

  walletPayment: async (orderId: string, success?: (res: any) => void, error?: (err: any) => void) => {
    try {
      return await axiosClient.post(`/api/checkout/wallet-point/`, { orderId }).then((res) => success && success(res))
    } catch (err: any) {
      if (err) {
        if (error) {
          error(err.response.data.message)
        }
      }
    }
  },

  confirmPayment: async (orderId: string, success?: (res: any) => void, error?: (err: any) => void) => {
    try {
      return await axiosClient.put(`/api/transaction/checkTranIsPaid/${orderId}`).then((res) => success && success(res))
    } catch (err) {
      if (err) {
        if (error) {
          error(err)
        }
      }
    }
  },

  changeShippingMethod: async (
    orderId: string,
    data: { shippingService: string },
    success?: (res: any) => void,
    error?: (err: any) => void,
  ) => {
    try {
      return await axiosClient
        .patch(`/api/orders/update-shipping-service/${orderId}`, data)
        .then((res) => success && success(res))
    } catch (err) {
      if (err) {
        if (error) {
          error(err)
        }
      }
    }
  },

  updateNote: async (
    orderId: string,
    data: { note: string },
    success?: (res: any) => void,
    error?: (err: any) => void,
  ) => {
    try {
      return await axiosClient
        .patch(`/api/orders/update-shipping-service/${orderId}`, data)
        .then((res) => success && success(res))
    } catch (err) {
      if (err) {
        if (error) {
          error(err)
        }
      }
    }
  },
}

export default checkoutService
