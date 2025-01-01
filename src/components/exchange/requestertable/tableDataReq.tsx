'use client'

import { columns } from './columnReq'
import { Table, Select } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { createStyles } from 'antd-style'
import exChangeService from '@/services/exchange/exchange.service'
import useSWR from 'swr'
import { useExchange } from '@/zustand/exchange'
import { useState } from 'react'
import { useMediaQuery } from '@mantine/hooks'

declare module 'antd-style' {
  interface FullToken {
    antCls: string
  }
}

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: light;
            scrollbar-color: unset;
          }
        }
      }
    `,
  }
})

export default function TableDataReq() {
  const { setExchanges, exchanges } = useExchange()
  const [total, setTotal] = useState(0)
  const [allUsers, setAllUsers] = useState<{ value: string; label: string }[]>([])
  const { styles } = useStyle()
  const param = useSearchParams()
  const router = useRouter()
  const page = Number(param.get('page')) || 1
  const limit = Number(param.get('limit')) || 10
  const filterUserIds = param.getAll('filterUserId')
  const isDesktop = useMediaQuery('(min-width: 62em)')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTableChange = (pagination: any) => {
    const newPage = pagination.current || page
    const newLimit = pagination.pageSize || limit

    // Giữ lại các filterUserId hiện tại
    const currentFilters = param.getAll('filterUserId')
    const filterParams = currentFilters.map((id) => `filterUserId=${id}`).join('&')

    const queryString = `page=${newPage}&limit=${newLimit}${filterParams ? '&' + filterParams : ''}`
    router.push(`/exchange-management?${queryString}`, { scroll: false })
  }

  useSWR('forAllUsers', () => exChangeService.getAll(1, 100, ''), {
    onSuccess: (data) => {
      if (!data || !data.data) {
        return
      }
      // Tạo một Map để lưu trữ user theo receiverId
      const uniqueUsers = new Map()

      data?.data
        .filter((user) => user.role === 'requester')
        .forEach((user) => {
          const receiverId = user.receiverId._id
          // Chỉ thêm vào Map nếu chưa tồn tại
          if (!uniqueUsers.has(receiverId)) {
            uniqueUsers.set(receiverId, {
              value: receiverId,
              label: user.receiverId.firstname + ' ' + user.receiverId.lastname,
            })
          }
        })

      // Chuyển Map thành mảng options
      setAllUsers(Array.from(uniqueUsers.values()))
    },
  })

  const { isLoading } = useSWR(
    ['exchanges', page, limit, ...filterUserIds],
    () => exChangeService.getAll(page, limit, filterUserIds.join(','), 'requester'),
    {
      onSuccess: (data) => {
        setExchanges(data?.data)
        setTotal(data?.total)
      },
    },
  )

  return (
    <>
      <Table
        title={() => (
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-xl font-semibold">Danh sách yêu cầu trao đổi</h2>
            <Select
              style={{ width: isDesktop ? '50%' : '100%' }}
              size="large"
              mode="multiple"
              placeholder="Chọn người nhận yêu cầu"
              options={allUsers}
              allowClear
              value={param.getAll('filterUserId')}
              onChange={(values) => {
                const currentParams = new URLSearchParams(window.location.search)

                // Xóa tất cả filterUserId cũ
                currentParams.delete('filterUserId')

                // Thêm các filterUserId mới
                values.forEach((id: string) => {
                  currentParams.append('filterUserId', id)
                })

                router.push(`/exchange-management${currentParams.toString() ? '?' + currentParams.toString() : ''}`)
              }}
            />
          </div>
        )}
        className={styles.customTable}
        sticky
        loading={isLoading}
        columns={columns}
        dataSource={exchanges || []}
        onChange={handleTableChange}
        scroll={{ x: isDesktop ? 0 : 200 * 5, y: 100 * 5 }}
        showSorterTooltip={false}
        pagination={{
          locale: { items_per_page: '/ 1 Trang' },
          current: page,
          pageSize: limit,
          total: total,
          showSizeChanger: true,
          showTotal: (total) => `Tổng có ${total} sản phẩm`,
        }}
      />
    </>
  )
}
