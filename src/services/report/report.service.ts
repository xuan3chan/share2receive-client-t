import axiosClient from '@/lib/axios'

type CreateReport = {
  reportType: 'product' | 'order'
  targetId: string
  reason: string
  description: string
}

const reportService = {
  createReport: async (data: CreateReport, success?: (res: any) => void, errorMessage?: (err: any) => void) => {
    try {
      return await axiosClient.post('/api/report', data).then((res) => success && success(res))
    } catch (err: any) {
      if (err) {
        if (errorMessage) {
          errorMessage(err.response.data.message)
        }
      }
    }
  },

  blockUser: async (reportId: string, success?: () => void, errorMessage?: (err: any) => void) => {
    try {
      return await axiosClient.put(`/api/report/block-user/${reportId}`).then(() => success && success())
    } catch (err: any) {
      if (err) {
        if (errorMessage) {
          errorMessage(err.response.data.message)
        }
      }
    }
  },

  blockProduct: async (reportId: string, success?: () => void, errorMessage?: (err: any) => void) => {
    try {
      return await axiosClient.put(`/api/report/block-product/${reportId}`).then(() => success && success())
    } catch (err: any) {
      if (err) {
        if (errorMessage) {
          errorMessage(err.response.data.message)
        }
      }
    }
  },
}

export default reportService
