'use client'

import useSWR from 'swr'
import transactionService from '@/services/transaction/transaction.service'
import { Transaction } from '@/types/transactionTypes'
import { useState } from 'react'
import { DataTable } from 'mantine-datatable'
import { useSearchParams, useRouter } from 'next/navigation'
import { useTransactionColumns } from './transactionColumn'

export default function TransactionTable() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const columns = useTransactionColumns()
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10

  const [transactions, setTransactions] = useState<Transaction[]>()
  const [totalRecords, setTotalRecords] = useState(0)

  const { isLoading, isValidating } = useSWR(['/transaction', page, limit], () => transactionService.getAll(page, limit), {
    onSuccess(data) {
      if (data) {
        setTransactions(data.data)
        setTotalRecords(data.pagination.totalItems)
      }
    },
  })

  return (
    <DataTable
      fetching={isLoading || isValidating}
      loaderType="bars"
      records={transactions || []}
      highlightOnHover
      loaderBackgroundBlur={1}
      loadingText="Đang tải dữ liệu..."
      height={500}
      maxHeight={500}
      scrollAreaProps={{ type: 'scroll' }}
      noRecordsText="Bạn chưa có giao dịch nào"
      striped
      page={page}
      totalRecords={totalRecords}
      recordsPerPage={limit}
      onPageChange={(newPage) =>
        router.push(`/transaction-management?page=${newPage}&limit=${limit}`, { scroll: false })
      }
      onRecordsPerPageChange={(newLimit) =>
        router.push(`/transaction-management?page=${page}&limit=${newLimit}`, { scroll: false })
      }
      recordsPerPageOptions={[10, 25, 50, 100]}
      recordsPerPageLabel="Số lượng trên trang"
      columns={columns}
    />
  )
}
