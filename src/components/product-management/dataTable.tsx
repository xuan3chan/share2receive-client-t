'use client'

import useSWR, { mutate } from 'swr'
import { columns } from '@/components/product-management/column'
import { Table, Input } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import productService from '@/services/product/product.service'
import { createStyles } from 'antd-style'
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

const DataTable = () => {
  const { styles } = useStyle()
  const isDesktop = useMediaQuery('(min-width: 62em)')
  const param = useSearchParams()
  const router = useRouter()
  const page = Number(param.get('page')) || 1
  const limit = Number(param.get('limit')) || 10
  const searchKey = param.get('searchKey') || ''
  const sortField = param.get('sortField') || ''
  const sortOrder = param.get('sortOrder') || ''

  // Xử lý preload dữ liệu cho các trang khác
  const preloadPages = (currentPage: number) => {
    const nextPage = currentPage + 1
    const prevPage = currentPage - 1

    // Prefetch next page
    if (nextPage) {
      mutate(
        ['/api/product', nextPage, limit, searchKey, sortField, sortOrder],
        productService.getAllProductUser(nextPage, limit, searchKey, sortField, sortOrder),
      )
    }

    // Prefetch previous page
    if (prevPage > 0) {
      mutate(
        ['/api/product', prevPage, limit, searchKey, sortField, sortOrder],
        productService.getAllProductUser(prevPage, limit, searchKey, sortField, sortOrder),
      )
    }
  }

  // Xử lý thay đổi sắp xếp và phân trang
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const newPage = pagination.current || page
    const newLimit = pagination.pageSize || limit
    const { field, order } = sorter
    const newSortField = field || sortField
    const newSortOrder = order === 'ascend' ? 'asc' : order === 'descend' ? 'desc' : ''

    // Cập nhật URL với các tham số mới
    router.push(
      `/product-management?page=${newPage}&limit=${newLimit}&searchKey=${searchKey}&sortField=${newSortField}&sortOrder=${newSortOrder}`,
    )

    // Prefetch dữ liệu cho trang trước và sau khi chuyển trang
    preloadPages(newPage)
  }

  const { data: products, isLoading } = useSWR(
    ['/api/product', page, limit, searchKey, sortField, sortOrder],
    () => productService.getAllProductUser(page, limit, searchKey, sortField, sortOrder),
    { onSuccess: () => preloadPages(page) },
  )

  return (
    <>
      <Table
        title={() => (
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
            <h2 className="text-xl font-semibold w-full sm:w-1/2">Danh sách sản phẩm</h2>
            <Input
              placeholder="Tìm kiếm sản phẩm"
              className="w-full sm:w-auto"
              onChange={(e) => {
                router.push(`/product-management?searchKey=${e.target.value}`)
              }}
            />
          </div>
        )}
        className={styles.customTable}
        sticky
        loading={isLoading}
        columns={columns}
        dataSource={products?.data || []}
        scroll={{ x: isDesktop ? 0 : 230 * 5, y: 100 * 5 }}
        showSorterTooltip={false}
        onChange={handleTableChange}
        pagination={{
          locale: { items_per_page: '/ 1 Trang' },
          current: page,
          pageSize: limit,
          total: products?.total,
          showSizeChanger: true,
          showTotal: (total) => `Tổng có ${total} sản phẩm`,
          responsive: true,
          size: 'small',
        }}
      />
    </>
  )
}

export default DataTable
