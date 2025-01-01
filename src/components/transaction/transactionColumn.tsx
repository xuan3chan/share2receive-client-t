'use client'

import { DataTableColumn } from 'mantine-datatable'
import { Transaction } from '@/types/transactionTypes'
import { formatPrice } from '@/helper/format'

export const useTransactionColumns = () => {
  const columns: DataTableColumn<Transaction>[] = [
    {
      accessor: 'transId',
      title: 'Mã giao dịch',
    },
    {
      accessor: 'orderInfo',
      title: 'Thông tin đơn hàng',
    },
    {
      accessor: 'amount',
      title: 'Số tiền',
      render: ({ amount }) => <>{formatPrice(amount)}đ</>,
    },
    {
      accessor: 'orderType',
      title: 'Loại giao dịch',
      render: ({ orderType }) => {
        return (
          <>
            {orderType === 'momo_wallet'
              ? 'Ví điện tử Momo'
              : orderType === 'cod'
                ? 'Thanh toán khi nhận hàng'
                : 'Thanh toán trực tuyến'}
          </>
        )
      },
    },
    {
      accessor: 'payType',
      title: 'Phương thức thanh toán',
      render: ({ payType }) => {
        return <>{payType === 'qr' ? 'Quét mã QR' : payType === 'napas' ? 'Thẻ ngân hàng' : 'Ví điện tử'}</>
      },
    },
    {
      accessor: 'createdAt',
      title: 'Ngày tạo',
      render: ({ createdAt }) => new Date(createdAt).toLocaleString(),
    },
  ]

  return columns
}
