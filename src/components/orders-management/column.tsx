'use client'

import { useRouter } from 'next/navigation'
import { Order } from '@/types/orderTypes'
import { Tooltip, UnstyledButton } from '@mantine/core'
import { DataTableColumn } from 'mantine-datatable'
import { formatDate } from '../product-management/column'
import { formatPrice } from '@/helper/format'
import IconifyIcon from '../icons'
import { useGetName } from '@/helper/getName'

export const useOrderColumns = () => {
  const router = useRouter()
  const { getOrderPaymentName, getColorPaymentName } = useGetName()

  const columns: DataTableColumn<Order>[] = [
    {
      accessor: 'orderUUID',
      title: 'Mã đơn hàng',
      render: ({ orderUUID }) => <p>{orderUUID}</p>,
      sortable: true,
    },
    {
      accessor: 'createdAt',
      title: 'Ngày tạo',
      render: ({ createdAt }) => formatDate(createdAt),
      sortable: true,
    },
    {
      accessor: 'totalAmount',
      title: 'Tổng tiền',
      render: ({ totalAmount }) => formatPrice(totalAmount) + 'đ',
      sortable: true,
    },
    {
      accessor: 'paymentStatus',
      title: 'Trạng thái thanh toán',
      render: ({ paymentStatus }) => {
        const color = getColorPaymentName(paymentStatus)
        return <p style={{ color: color }}>{getOrderPaymentName(paymentStatus)}</p>
      },
      sortable: true,
    },
    {
      accessor: '_id',
      title: 'Hành động',
      textAlign: 'center',
      render: ({ _id }) => (
        <>
          <Tooltip label="Xem chi tiết" position="bottom" withArrow>
            <UnstyledButton
              className="p-2 rounded-md hover:bg-gray-100"
              onClick={() => router.push(`/checkout/${_id}?callback=orders-management`)}
            >
              <IconifyIcon icon="weui:eyes-on-outlined" />
            </UnstyledButton>
          </Tooltip>
        </>
      ),
    },
  ]

  return columns
}
