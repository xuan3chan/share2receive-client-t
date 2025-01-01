'use client'
import useSWR from 'swr'
import orderService from '@/services/order/order.service'
import { Sell } from '@/types/sellType'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useSellColumns } from './column'
import { useSearchParams, useRouter } from 'next/navigation'
import { debounce } from 'lodash'
import { DateInput, DatesProvider } from '@mantine/dates'
import { DataTable } from 'mantine-datatable'
import { TextInput } from '@mantine/core'
import { useOrderStore } from '@/zustand/order'
import 'dayjs/locale/vi'

const ViewDetail = dynamic(() => import('@/components/sell-management/viewDetail'), { ssr: false })

const PAGE_SIZE = [10, 25, 50, 100]

export default function SellPage() {
  const [sells, setSells] = useState<Sell[]>()
  const columns = useSellColumns()
  const { toggleDetailModal, openDetailModal, sell, setSell } = useOrderStore()

  const router = useRouter()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10
  const searchKey = searchParams.get('searchKey') || ''
  const dateFrom = searchParams.get('dateFrom') || ''
  const dateTo = searchParams.get('dateTo') || ''
  const sortBy = searchParams.get('sortBy') || ''
  const sortOrder = searchParams.get('sortOrder') || ''

  const [inputValue, setInputValue] = useState(searchKey)
  const [totalRecords, setTotalRecords] = useState(0)

  // Debounce function để tránh gọi API liên tục khi tìm kiếm
  const debouncedSearch = debounce((value: string) => {
    router.push(`/sell-management?searchKey=${value}&page=1&limit=${limit}`, { scroll: false })
  }, 300)

  const { isLoading, isValidating } = useSWR(
    ['/sell/user', page, limit, searchKey, sortBy, sortOrder, dateFrom, dateTo],
    () => orderService.getAllOrdersByUser(page, limit, searchKey, sortBy, sortOrder, dateFrom, dateTo),
    {
      onSuccess(data) {
        if (data) {
          setSells(data.data)
          setTotalRecords(data.pagination.totalOrders)
        }
      },
    },
  )

  const handleSort = (field: string) => {
    const newSortOrder = field === sortBy && sortOrder === 'asc' ? 'desc' : 'asc'
    router.push(
      `/sell-management?page=${page}&limit=${limit}&searchKey=${searchKey}&sortBy=${field}&sortOrder=${newSortOrder}`,
      { scroll: false },
    )
  }

  const [dateFromValue, setDateFromValue] = useState<Date | null>(dateFrom ? new Date(dateFrom) : null)
  const [dateToValue, setDateToValue] = useState<Date | null>(dateTo ? new Date(dateTo) : null)

  return (
    <>
      <ViewDetail
        opened={openDetailModal}
        onClose={() => {
          setSell({} as Sell)
          toggleDetailModal()
        }}
        sell={sell}
      />
      <div className="container px-1 md:px-10 mx-auto">
        <div className="title text-black text-2xl font-semibold">
          <h2>Quản lý đơn bán</h2>
        </div>
        <div className="mt-5 bg-white p-2 shadow-lg rounded-md">
          <div className="flex flex-1 justify-between mb-2 gap-3">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold">Danh sách đơn bán</h2>
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
            <DatesProvider settings={{ locale: 'vi' }}>
              <DateInput
                label="Từ ngày"
                placeholder="Chọn ngày bắt đầu"
                value={dateFromValue}
                onChange={(date) => {
                  setDateFromValue(date)
                  const formattedDate = date?.toISOString().split('T')[0] || ''
                  router.push(`/sell-management?dateFrom=${formattedDate}&dateTo=${dateTo}&page=1&limit=${limit}`, {
                    scroll: false,
                  })
                }}
                clearable
              />

              <DateInput
                label="Đến ngày"
                placeholder="Chọn ngày kết thúc"
                value={dateToValue}
                onChange={(date) => {
                  setDateToValue(date)
                  const formattedDate = date?.toISOString().split('T')[0] || ''
                  router.push(`/sell-management?dateFrom=${dateFrom}&dateTo=${formattedDate}&page=1&limit=${limit}`, {
                    scroll: false,
                  })
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
            records={sells || []}
            minHeight={200}
            height={500}
            maxHeight={500}
            scrollAreaProps={{ type: 'scroll' }}
            noRecordsText={isValidating ? 'Đang tải dữ liệu...' : 'Không có đơn hàng nào'}
            striped
            page={page}
            totalRecords={totalRecords}
            recordsPerPage={limit}
            onPageChange={(newPage) => {
              router.push(`/sell-management?page=${newPage}&limit=${limit}&searchKey=${inputValue}`, { scroll: false })
            }}
            onRecordsPerPageChange={(newLimit) => {
              router.push(`/sell-management?page=1&limit=${newLimit}&searchKey=${inputValue}`, { scroll: false })
            }}
            recordsPerPageOptions={PAGE_SIZE}
            recordsPerPageLabel="Số lượng trên trang"
            sortStatus={
              sortBy
                ? {
                    columnAccessor: sortBy as keyof Sell,
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
    </>
  )
}
