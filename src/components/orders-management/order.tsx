'use client'
import useSWR from 'swr'
import orderService from '@/services/order/order.service'
import { Order, Orders } from '@/types/orderTypes'
import { useState } from 'react'
import { DataTable } from 'mantine-datatable'
import { TextInput, Select } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useOrderColumns } from './column'
import { useSearchParams, useRouter } from 'next/navigation'
import { debounce } from 'lodash'
import { DatesProvider } from '@mantine/dates'
import 'dayjs/locale/vi'
import dayjs from 'dayjs'

const PAGE_SIZE = [10, 25, 50, 100]

export default function OrderManagement() {
  const [orders, setOrders] = useState<Orders>()
  const columns = useOrderColumns()

  const router = useRouter()
  const searchParams = useSearchParams()

  // Lấy các tham số từ URL
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10
  const paymentStatus = searchParams.get('paymentStatus') || ''
  const searchKey = searchParams.get('searchKey') || ''
  const dateFrom = searchParams.get('dateFrom') || ''
  const dateTo = searchParams.get('dateTo') || ''
  const sortBy = searchParams.get('sortBy') || ''
  const sortOrder = searchParams.get('sortOrder') || ''

  const [inputValue, setInputValue] = useState(searchKey)

  // Debounce function để tránh gọi API liên tục khi tìm kiếm
  const debouncedSearch = debounce((value: string) => {
    router.push(`/orders-management?searchKey=${value}&page=1&limit=${limit}`)
  }, 300)

  // Gọi API dựa vào tham số URL và giữ lại dữ liệu cũ khi thay đổi
  const { isLoading, isValidating } = useSWR(
    ['/order/user', page, limit, searchKey, sortBy, sortOrder, dateFrom, dateTo, paymentStatus],
    () => orderService.getAllOrders(page, limit, searchKey, sortBy, sortOrder, dateFrom, dateTo, paymentStatus),
    {
      onSuccess(data) {
        if (data) setOrders(data)
      },
      revalidateOnFocus: false,
      revalidateOnMount: true,
    },
  )

  // Thêm hàm xử lý sort
  const handleSort = (field: string) => {
    const newSortOrder = field === sortBy && sortOrder === 'asc' ? 'desc' : 'asc'
    router.push(
      `/orders-management?page=${page}&limit=${limit}&searchKey=${searchKey}&sortBy=${field}&sortOrder=${newSortOrder}&paymentStatus=${paymentStatus}`,
    )
  }

  // Thêm state để lưu giá trị ngày
  const [dateFromValue, setDateFromValue] = useState<Date | null>(dateFrom ? new Date(dateFrom) : null)
  const [dateToValue, setDateToValue] = useState<Date | null>(dateTo ? new Date(dateTo) : null)

  return (
    <div className="container px-1 md:px-10 mx-auto">
      <div className="title text-black text-2xl font-semibold">
        <h2>Đơn hàng của tôi</h2>
      </div>
      <div className="mt-5 bg-white p-2 shadow-lg rounded-md">
        <div className="flex flex-1 justify-between mb-2 gap-3">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold">Danh sách đơn hàng</h2>
          </div>

          <TextInput
            placeholder="Tìm kiếm"
            style={{ width: '40%' }}
            onChange={(e) => {
              setInputValue(e.target.value) // Cập nhật giá trị ô input
              debouncedSearch(e.target.value) // Thực hiện debounce và cập nhật URL
            }}
            value={inputValue}
          />
        </div>
        <div className="flex flex-1 justify-start mb-3 gap-4">
          <Select
            label="Trạng thái thanh toán"
            data={[
              {
                label: 'Tất cả',
                value: '',
              },
              {
                label: 'Đã thanh toán',
                value: 'paid',
              },
              {
                label: 'Chưa thanh toán',
                value: 'pending',
              },
              {
                label: 'Thất bại',
                value: 'failed',
              },
            ]}
            placeholder="Trạng thái thanh toán"
            value={paymentStatus}
            onChange={(value) => {
              router.push(`/orders-management?paymentStatus=${value}&page=1&limit=${limit}`)
            }}
          />
          <DatesProvider settings={{ locale: 'vi' }}>
            <DateInput
              label="Từ ngày"
              placeholder="Chọn ngày bắt đầu"
              value={dateFromValue}
              onChange={(date) => {
                setDateFromValue(date)
                const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : ''
                router.push(
                  `/orders-management?dateFrom=${formattedDate}&dateTo=${dateTo}&page=1&limit=${limit}&paymentStatus=${paymentStatus}`,
                )
              }}
              clearable
            />

            <DateInput
              label="Đến ngày"
              placeholder="Chọn ngày kết thúc"
              value={dateToValue}
              onChange={(date) => {
                setDateToValue(date)
                const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : ''
                router.push(
                  `/orders-management?dateFrom=${dateFrom}&dateTo=${formattedDate}&page=1&limit=${limit}&paymentStatus=${paymentStatus}`,
                )
              }}
              disabled={!dateFromValue}
              clearable
              minDate={dateFromValue || undefined}
            />
          </DatesProvider>
        </div>
        <DataTable
          fetching={isLoading || isValidating}
          loaderType="bars"
          highlightOnHover
          loaderBackgroundBlur={1}
          columns={columns}
          height={500}
          maxHeight={500}
          minHeight={200}
          noRecordsText={isValidating ? 'Đang tải dữ liệu...' : 'Không có đơn hàng nào'}
          records={orders?.data || []}
          striped
          page={page}
          totalRecords={orders?.pagination?.totalOrders || 0}
          recordsPerPage={limit}
          onPageChange={(newPage) => {
            router.push(`/orders-management?page=${newPage}&limit=${limit}&searchKey=${inputValue}`)
          }}
          onRecordsPerPageChange={(newLimit) => {
            router.push(`/orders-management?page=1&limit=${newLimit}&searchKey=${inputValue}`)
          }}
          recordsPerPageOptions={PAGE_SIZE}
          recordsPerPageLabel="Số lượng trên trang"
          sortStatus={
            sortBy
              ? {
                  columnAccessor: sortBy as keyof Order,
                  direction: sortOrder as 'asc' | 'desc',
                }
              : { columnAccessor: '', direction: 'asc' }
          }
          onSortStatusChange={({ columnAccessor }) => {
            handleSort(columnAccessor as string)
          }}
        />
      </div>
    </div>
  )
}
