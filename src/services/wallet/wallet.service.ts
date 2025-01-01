import axiosClient from '@/lib/axios'
import { Wallet } from '@/types/wallet'

const walletService = {
  getWallet: async (): Promise<Wallet> =>
    axiosClient
      .get('/api/wallet/get-wallet')
      .then((res: any) => res)
      .catch((error: any) => error.response.data.message),

  checkoutMomo: async (point: number, successCallback?: (res: any) => void, errorCallBack?: (res: any) => void) => {
    try {
      return await axiosClient
        .post('/api/checkout/momo-point', { point })
        .then((res) => successCallback && successCallback(res))
    } catch (error: any) {
      if (error) {
        return errorCallBack && errorCallBack(error.response.data.message)
      }
    }
  },

  checkoutMomoPacket: async (
    packetId: string,
    successCallback?: (res: any) => void,
    errorCallBack?: (res: any) => void,
  ) => {
    try {
      return await axiosClient
        .post('/api/checkout/momo-packet-point', { packetId })
        .then((res) => successCallback && successCallback(res))
    } catch (error: any) {
      if (error) {
        return errorCallBack && errorCallBack(error.response.data.message)
      }
    }
  },
}

export default walletService
