import axiClient from '@/lib/axios'
import { CreateExchangeType, ExchangeType, Exchange } from '@/types/exchangeTypes'

const exChangeService = {
  //  ** Get all exchange
  getAll: async (page?: number, limit?: number, filterUserId?: string, filterRole?: string): Promise<ExchangeType> => {
    const queryParams = new URLSearchParams()

    if (page) queryParams.append('page', page.toString())
    if (limit) queryParams.append('limit', limit.toString())
    if (filterRole) queryParams.append('filterRole', filterRole)

    if (filterUserId) {
      filterUserId.split(',').forEach((id) => {
        if (id) queryParams.append('filterUserId', id)
      })
    }

    const res: ExchangeType = await axiClient.get('/api/Exchange/get-list-exchange', {
      params: queryParams,
    })

    return res
  },

  // ** Create exchange
  create: async (data: CreateExchangeType) => {
    const res = await axiClient.post('/api/Exchange', data)

    return res?.data
  },

  // ** Approve exchange
  approve: async (id: string, status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'canceled') => {
    axiClient.patch(`/api/Exchange/approve-exchange/${id}?status=${status}`)
  },

  // ** Update exchange
  update: async (id: string, status: 'pending' | 'shipping' | 'delivered' | 'canceled') => {
    const res = await axiClient.patch(`/api/Exchange/update-status-exchange/${id}?status=${status}`)

    return res?.data
  },

  // ** Get exchange by id
  getById: async (id: string): Promise<Exchange> => {
    const res: Exchange = await axiClient.get(`/api/Exchange/get-exchange-detail/${id}`)

    return res
  },

  // ** Confirm received
  confirmReceived: async (id: string, status: 'confirmed' | 'pending') => {
    const res = await axiClient.patch(`/api/Exchange/update-confirm-status-exchange/${id}?confirmStatus=${status}`)

    return res?.data
  },
}

export default exChangeService
