import axiosClient from '@/lib/axios'
import { TransactionList } from '@/types/transactionTypes'

const transactionService = {
  getAll: (page?: number, limit?: number): Promise<TransactionList> => {
    const params = {
      ...(page && { page }),
      ...(limit && { limit }),
    }

    return axiosClient.get('/api/transaction/get-list-transaction', { params })
  },
}

export default transactionService
