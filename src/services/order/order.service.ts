import axiosClient from '@/lib/axios'
import { CreateOrderNow, OrderById, Orders, UpdateAddressOrder } from '@/types/orderTypes'
import { SellType } from '@/types/sellType'

export type Banking = {
  id: string
  name: string
  code: string
  bin: number
  short_name: string
  logo_url: string
  icon_url: string
  swift_code: string
  lookup_supported: number
}

export type ListBanking = {
  data: Banking[]
}

const URL_BANKING = 'https://api.httzip.com/api/bank'

export type CancelSubOrder = {
  bankingNumber: string
  bankingName: string
  bankingNameUser: string
  bankingBranch: string
  reason: string
}

const orderService = {
  createOrder: async (success?: (res: any) => void, errorMessage?: (message: string) => void) => {
    try {
      return await axiosClient.post('/api/orders').then((res) => success && success(res))
    } catch (error: any) {
      if (error) {
        if (errorMessage) {
          errorMessage(error.response?.data.message)
        }
      }
    }
  },

  getAllOrders: async (
    page?: number,
    limit?: number,
    searchKey?: string,
    sortBy?: string,
    sortOrder?: string,
    dateFrom?: string,
    dateTo?: string,
    paymentStatus?: string,
  ): Promise<Orders> => {
    const params = {
      ...(page && { page }),
      ...(limit && { limit }),
      ...(searchKey && { searchKey }),
      ...(sortBy && { sortBy }),
      ...(sortOrder && { sortOrder }),
      ...(dateFrom && { dateFrom }),
      ...(dateTo && { dateTo }),
      ...(paymentStatus && { paymentStatus }),
    }
    const res: Orders = await axiosClient.get('/api/orders', { params })

    return res
  },

  getAllOrdersByUser: async (
    page?: number,
    limit?: number,
    searchKey?: string,
    sortBy?: string,
    sortOrder?: string,
    dateFrom?: string,
    dateTo?: string,
  ): Promise<SellType> => {
    const params = {
      ...(page && { page }),
      ...(limit && { limit }),
      ...(searchKey && { searchKey }),
      ...(sortBy && { sortBy }),
      ...(sortOrder && { sortOrder }),
      ...(dateFrom && { dateFrom }),
      ...(dateTo && { dateTo }),
    }
    const res: SellType = await axiosClient.get('/api/orders/get-order-for-seller', { params })

    return res
  },

  getOrderById: async (id: string): Promise<OrderById> => {
    const res: OrderById = await axiosClient.get(`/api/orders/${id}`)

    return res
  },

  updateAddressOrder: async (
    id: string,
    data: UpdateAddressOrder,
    success?: (res: any) => void,
    errorMessage?: (message: string) => void,
  ) => {
    try {
      return await axiosClient.patch(`/api/orders/${id}`, data).then((res) => success && success(res))
    } catch (error: any) {
      if (error) {
        if (errorMessage) {
          errorMessage(error.response?.data.message)
        }
      }
    }
  },

  // Create order now
  createOrderNow: async (
    data: CreateOrderNow,
    success?: (res: any) => void,
    errorMessage?: (message: string) => void,
  ) => {
    try {
      return await axiosClient.post('/api/orders/create-now', data).then((res) => success && success(res))
    } catch (error: any) {
      if (error) {
        if (errorMessage) {
          errorMessage(error.response?.data.message)
        }
      }
    }
  },

  cancelOrder: async (id: string, success?: () => void, errorMessage?: (message: string) => void) => {
    try {
      return await axiosClient.patch(`/api/orders/cancel/${id}`).then(() => success && success())
    } catch (error: any) {
      if (error) {
        if (errorMessage) {
          errorMessage(error.response?.data.message)
        }
      }
    }
  },

  cancelSubOrder: async (
    subOrderId: string,
    data: CancelSubOrder,
    success?: () => void,
    errorMessage?: (message: string) => void,
  ) => {
    try {
      return await axiosClient.put(`/api/orders/request-refund/${subOrderId}`, data).then(() => success && success())
    } catch (error: any) {
      if (error) {
        if (errorMessage) {
          errorMessage(error.response?.data.message)
        }
      }
    }
  },

  confirmReceived: async (
    id: string,
    status: string,
    success?: () => void,
    errorMessage?: (message: string) => void,
  ) => {
    try {
      return await axiosClient
        .patch(`/api/orders/update-status-for-buyer/${id}`, { status })
        .then(() => success && success())
    } catch (error: any) {
      if (error) {
        if (errorMessage) {
          errorMessage(error.response?.data.message)
        }
      }
    }
  },

  changeStatusOrder: async (
    id: string,
    status: string,
    success?: () => void,
    errorMessage?: (message: string) => void,
  ) => {
    try {
      return await axiosClient
        .patch(`/api/orders/update-status-for-sell/${id}`, { status })
        .then(() => success && success())
    } catch (error: any) {
      if (error) {
        if (errorMessage) {
          errorMessage(error.response?.data.message)
        }
      }
    }
  },

  deleteSubOrder: async (subOrderId: string, success?: () => void, errorMessage?: (message: string) => void) => {
    try {
      return await axiosClient.delete(`/api/orders/${subOrderId}`).then(() => success && success())
    } catch (error: any) {
      if (error) {
        if (errorMessage) {
          errorMessage(error.response?.data.message)
        }
      }
    }
  },
  deleteOrderProduct: async (
    subOrderId: string,
    orderItemId: string,
    success?: () => void,
    errorMessage?: (message: string) => void,
  ) => {
    try {
      return await axiosClient.delete(`/api/orders/${subOrderId}/${orderItemId}`).then(() => success && success())
    } catch (error: any) {
      if (error) {
        if (errorMessage) {
          errorMessage(error.response?.data.message)
        }
      }
    }
  },

  listBanking: async (): Promise<ListBanking> => fetch(`${URL_BANKING}/list`).then((res) => res.json()),

  checkBanking: async (bank: string, account: string): Promise<any> => {
    return fetch(`${URL_BANKING}/id-lookup-prod`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_API_BANKING || '',
        'x-api-secret': process.env.NEXT_PUBLIC_API_BANKING_SECRET || '',
      },
      body: JSON.stringify({ bank, account }),
    }).then((res) => res.json())
  },
}

export default orderService
