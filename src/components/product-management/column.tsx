'use client'

import { Button, Popover, type TableProps, Dropdown } from 'antd'
import Image from 'next/image'
import { Product } from '@/types/users/productTypes'
import { IconEdit, IconTrash, IconLock, IconEye } from '@tabler/icons-react'
import { EllipsisOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { useProductManagement } from '@/zustand/productManagement'
import { useCategory } from '@/zustand/category'
import { truncateText } from '@/helper/format'

export const formatDate = (date: string | Date) => {
  const d = new Date(date)
  return d.toLocaleDateString('vi-VN')
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'decimal' }).format(price)
}

export const columns: TableProps<Product>['columns'] = [
  {
    title: 'Sản phẩm',
    dataIndex: 'imgUrls',
    key: 'image',
    render: (_, record: Product) => (
      <>
        {record?.imgUrls.length > 0 ? (
          <Image
            src={record?.imgUrls[0] || '/images/no-image.png'}
            alt={record?.productName}
            width={50}
            height={50}
            objectFit="cover"
          />
        ) : (
          'Chưa có ảnh'
        )}
      </>
    ),
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'productName',
    key: 'name',
    sorter: true,
    width: '30%',
    render: (_, record: Product) => (
      <>
        <div className="flex items-center">
          <span>{truncateText(record.productName, 20)}</span>
          {record.isBlock && (
            <Popover title="Thông báo" placement="bottom" content="Sản phẩm đã bị khóa">
              <Button size="small" type="text" shape="circle" icon={<IconLock size={20} />} />
            </Popover>
          )}
        </div>
      </>
    ),
  },
  {
    title: 'Giá/Loại',
    dataIndex: 'price',
    key: 'price',
    sorter: true,
    render: (_, record: Product) => (
      <>{record.type === 'donate' ? 'Quyên góp' : record.price > 0 ? formatPrice(record.price) + ' VNĐ' : 'Trao đổi'}</>
    ),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    sorter: true,
    render: (_, record: Product) => (
      <>
        {record.status === 'active' && 'Hoạt động'}
        {record.status === 'inactive' && 'Không hoạt động'}
        {record.status === 'suspend' && 'Tạm ngưng'}
        {record.status === 'soldOut' && 'Hết hàng'}
      </>
    ),
  },
  {
    title: 'Danh mục',
    dataIndex: 'categoryId',
    key: 'category',
    sorter: true,
    render: (_, record: Product) => (
      <>{useCategory.getState().categories?.find((cate) => cate._id === record.categoryId)?.name}</>
    ),
  },
  {
    title: 'Phê duyệt',
    dataIndex: 'approved',
    key: 'approved',
    sorter: true,
    render: (_, record: Product) => (
      <>
        {record.approved.approveStatus === 'approved' && (
          <div className="flex items-center">
            <span
              className="rounded-sm px-1"
              style={{
                backgroundColor: '#34D3992D',
                color: '#34D399',
              }}
            >
              Đã duyệt
            </span>
            <Popover
              title="Thông tin phê duyệt"
              placement="bottom"
              content={
                <>
                  <p>
                    <span className="font-semibold">Ngày duyệt:</span> {formatDate(record.approved.date)}
                  </p>
                  <p>
                    <span className="font-semibold">Người duyệt:</span> {record.approved.decisionBy}
                  </p>
                  <p>
                    <span className="font-semibold">Mô tả:</span> {record.approved.description}
                  </p>
                </>
              }
            >
              <Button size="small" type="text" shape="circle" icon={<InfoCircleOutlined />} />
            </Popover>
          </div>
        )}
        {record.approved.approveStatus === 'pending' && (
          <div className="flex items-center">
            <span
              className="rounded-sm px-1"
              style={{
                backgroundColor: '#FFD7002D',
                color: '#FFD700',
              }}
            >
              Chờ duyệt
            </span>
          </div>
        )}
        {record.approved.approveStatus === 'rejected' && (
          <div className="flex items-center">
            <span
              className="rounded-sm px-1"
              style={{
                backgroundColor: '#FF00002D',
                color: '#FF0000',
              }}
            >
              Từ chối
            </span>
            <Popover
              title="Thông tin phê duyệt"
              placement="bottom"
              content={
                <>
                  <p>
                    <span className="font-semibold">Ngày duyệt:</span> {formatDate(record.approved.date)}
                  </p>
                  <p>
                    <span className="font-semibold">Người duyệt:</span> {record.approved.decisionBy}
                  </p>
                  <p>
                    <span className="font-semibold">Mô tả:</span> {record.approved.description}
                  </p>
                </>
              }
            >
              <Button size="small" type="text" shape="circle" icon={<InfoCircleOutlined />} />
            </Popover>
          </div>
        )}
      </>
    ),
  },
  {
    dataIndex: 'action',
    key: 'action',
    align: 'end',
    width: '6%',
    render: (_, record: Product) => (
      <>
        <Dropdown
          arrow
          placement="bottomCenter"
          trigger={['click']}
          menu={{
            items: [
              {
                key: 'view',
                label: 'Xem chi tiết',
                icon: <IconEye size={20} />,
                onClick: () => {
                  useProductManagement.getState().toggleViewProductModal()
                  useProductManagement.getState().setProduct(record)
                },
              },
              {
                key: 'edit',
                label: 'Chỉnh sửa',
                icon: <IconEdit size={20} />,
                onClick: () => {
                  useProductManagement.getState().toggleEditProductModal()
                  useProductManagement.getState().setProduct(record)
                },
              },
              {
                key: 'delete',
                label: 'Xóa',
                icon: <IconTrash size={20} />,
                onClick: () => {
                  useProductManagement.getState().toggleDeleteProductModal()
                  useProductManagement.getState().setProduct(record)
                },
              },
            ],
          }}
        >
          <Button icon={<EllipsisOutlined size={20} />} variant="text" shape="circle" color="default" />
        </Dropdown>
      </>
    ),
  },
]
