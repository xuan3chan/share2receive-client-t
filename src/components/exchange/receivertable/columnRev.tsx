'use client'

import { truncateText } from '@/helper/format'
import { Exchange } from '@/types/exchangeTypes'
import { rem, Avatar } from '@mantine/core'
import { TableProps, Button, Tooltip } from 'antd'
import Image from 'next/image'
import { getAllExchangeStatusName } from '@/helper/getName'
import IconifyIcon from '@/components/icons'
import { useExchange } from '@/zustand/exchange'

export const columns: TableProps<Exchange>['columns'] = [
  {
    title: 'STT',
    dataIndex: '_id',
    key: 'id',
    width: 70,
    render: (_, __, index) => {
      return <div>{index + 1}</div>
    },
  },
  {
    title: 'Người gửi yêu cầu',
    dataIndex: 'role',
    key: 'yourProduct',
    width: '30%',
    render: (_, record) => {
      const receiver = record.role === 'requester' ? record.receiverId : record.requesterId
      return (
        <div className="w-fit">
          <div className="flex flex-row items-center">
            <Avatar
              size={rem(40)}
              src={receiver.avatar}
              alt={receiver.firstname + ' ' + receiver.lastname}
            />
            <div className="flex flex-col ml-1">
              <h1 className="font-medium">{receiver.firstname + ' ' + receiver.lastname}</h1>
              <p className="text-sm text-gray-500">{receiver.email}</p>
            </div>
          </div>
        </div>
      )
    },
  },
  {
    title: 'Sản phẩm cần đổi',
    dataIndex: 'role',
    key: 'receiverId',
    render: (_, record) => {
      const product =
        record.role === 'receiver'
          ? record.requestProduct.requesterProductId
          : record.receiveProduct.receiverProductId

      return (
        <div>
          <div>{truncateText(product.productName, 20)}</div>
          {product.imgUrls && product.imgUrls.length > 0 && (
            <Image
              src={product.imgUrls[0]}
              alt={product.productName}
              style={{ width: '80px', height: '100%', objectFit: 'cover' }}
              width={100}
              height={100}
            />
          )}
        </div>
      )
    },
  },
  {
    title: 'Sản phẩn của bạn',
    dataIndex: 'role',
    key: 'otherProduct',
    render: (_, record) => {
      const product =
        record.role === 'receiver'
          ? record.receiveProduct.receiverProductId
          : record.requestProduct.requesterProductId

      return (
        <div>
          <div>{truncateText(product.productName, 20)}</div>
          {product.imgUrls && product.imgUrls.length > 0 && (
            <Image
              src={product.imgUrls[0]}
              alt={product.productName}
              style={{ width: '80px', height: '100%', objectFit: 'cover' }}
              width={100}
              height={100}
            />
          )}
        </div>
      )
    },
  },
  {
    title: 'Trạng thái',
    dataIndex: 'allExchangeStatus',
    key: 'status',
    colSpan: 2,
    align: 'left',
    render: (_, record) => {
      const getStatusColor = (status: string) => {
        switch (status) {
          case 'canceled':
          case 'rejected':
            return '#FF4D4F' // màu đỏ
          case 'pending':
            return '#FAAD14' // màu vàng
          case 'completed':
            return '#52C41A' // màu xanh lá
          case 'accepted':
            return '#1890FF' // màu xanh dương
          default:
            return 'inherit'
        }
      }

      return (
        <div
          style={{
            color: getStatusColor(record.allExchangeStatus),
            backgroundColor: `${getStatusColor(record.allExchangeStatus)}3D`,
            padding: '2px 6px',
            borderRadius: '5px',
            width: 'fit-content',
          }}
        >
          {getAllExchangeStatusName(record.allExchangeStatus)}
        </div>
      )
    },
  },
  {
    title: '',
    key: 'action',
    width: '8%',
    align: 'right',
    render: (_, record) => {
      return (
        <div className="w-fit">
          <Button
            onClick={() => {
              setTimeout(() => {
                useExchange.getState().setOpenViewExchangeModalRev(true)
              }, 200)
              useExchange.getState().setExchangeIdRev(record._id)
            }}
            variant="text"
            type="text"
            style={{
              border: 'none',
            }}
            key={record._id}
            icon={
              <Tooltip title="Xem chi tiết" trigger="hover">
                <IconifyIcon icon="weui:eyes-on-filled" />
              </Tooltip>
            }
          />
        </div>
      )
    },
  },
]
