'use client'
import useSWR from 'swr'
import statisticService from '@/services/statistist/statistist.service'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import 'dayjs/locale/vi'
import dayjs from 'dayjs'
import { useAuth } from '@/hooks/useAuth'
import dynamic from 'next/dynamic'

const StatsSummary = dynamic(() => import('./StatsSummary'), { ssr: false, loading: () => <p>Loading...</p> })
const DateFilters = dynamic(() => import('./DateFilters'), { ssr: false, loading: () => <p>Loading...</p> })
const LineChartDashboard = dynamic(() => import('./LineChartDashboard'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})
const DonutChart = dynamic(() => import('./DonutChart'), { ssr: false, loading: () => <p>Loading...</p> })
const DashboardSkeleton = dynamic(() => import('./dashboardSkeleton'), { ssr: false, loading: () => <p>Loading...</p> })

type DataPoint = {
  date: string
  paidUUIDs: string[]
  refundedUUIDs: string[]
  totalPaid: number
  totalRefund: number
  totalShippingFee: number
  totalSubTotal: number
}

export default function DashboardPage() {
  const searchParams = useSearchParams()

  const startDate = searchParams.get('startDate')?.toString() || ''
  const endDate = searchParams.get('endDate')?.toString() || ''
  const viewBy = searchParams.get('viewBy')?.toString() || 'month'

  const [value, setValue] = useState<{ value: string; label: string } | null>(
    viewBy ? { value: viewBy, label: viewBy } : null,
  )
  const [dateFromValue, setDateFromValue] = useState<Date | null>(startDate ? new Date(startDate) : null)
  const [dateToValue, setDateToValue] = useState<Date | null>(endDate ? new Date(endDate) : null)
  const [selectedPoint, setSelectedPoint] = useState<DataPoint>()
  const [startDateDisplay, setStartDateDisplay] = useState<string>('')
  const [endDateDisplay, setEndDateDisplay] = useState<string>('')

  const { user } = useAuth()

  const [totalWeight, setTotalWeight] = useState<number>(0)
  useEffect(() => {
    if (user) {
      statisticService.getEcoOfUser().then((res) => {
        setTotalWeight(res.totalWeight)
      })
    }
  }, [user])

  const { data } = useSWR(
    ['/api/statistic', startDate, endDate, viewBy],
    () => statisticService.getStatisticForSeller(startDate, endDate, viewBy),
    {
      onSuccess(data) {
        if (data) {
          const firstDate = data.dailyDetails[0]?.date
          const lastDate = data.dailyDetails[data.dailyDetails.length - 1]?.date
          setStartDateDisplay(firstDate)
          setEndDateDisplay(lastDate)
        }
      },
      revalidateOnMount: true,
      keepPreviousData: true,
    },
  )

  const { data: TimeAddToCart } = useSWR(
    '/api/statistics/get-time-add-cart',
    statisticService.getTotalTimeUserAddtoCart,
    {
      keepPreviousData: true,
      revalidateOnMount: true,
    },
  )

  const handlePointClick = (dataPoint: any) => {
    setSelectedPoint(dataPoint)
  }

  if (!data || !TimeAddToCart) {
    return <DashboardSkeleton />
  }

  return (
    <div className="container mx-auto px-6 md:px-10 space-y-6">
      {/* Tổng khối lượng */}
      <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white">Tổng khối lượng rác thải đã tiết kiệm</h2>
        <p className="text-4xl font-extrabold text-white mt-2">{totalWeight} gram</p>
      </div>

      {/* Tổng quan */}
      <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Tổng quan</h2>
          <p className="text-md text-gray-500">
            {startDateDisplay && endDateDisplay
              ? `Từ ${dayjs(startDateDisplay).format('DD/MM/YYYY')} đến ${dayjs(endDateDisplay).format('DD/MM/YYYY')}`
              : 'Tất cả thời gian'}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <DateFilters
            value={value}
            setValue={setValue}
            dateFromValue={dateFromValue}
            setDateFromValue={setDateFromValue}
            dateToValue={dateToValue}
            setDateToValue={setDateToValue}
            endDate={endDate}
            startDate={startDate}
            viewBy={viewBy}
          />
        </div>
      </div>

      {/* Tổng hợp giá trị và Biểu đồ donut */}
      <div className="flex flex-row gap-6">
        {/* Tổng hợp các giá trị */}
        <StatsSummary data={data} />
        {/* Biểu đồ donut */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Thống kê thêm vào giỏ hàng</h2>
          {TimeAddToCart.data.length > 0 ? (
            <DonutChart data={TimeAddToCart.data} />
          ) : (
            <p className="text-center text-gray-400">Không có dữ liệu</p>
          )}
        </div>
      </div>

      {/* Biểu đồ đường và bộ lọc */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Thống kê các khoản phí</h2>
        </div>
        <LineChartDashboard data={data} handlePointClick={handlePointClick} />
      </div>

      {/* Thông tin khi click vào điểm hoặc hướng dẫn */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        {selectedPoint ? (
          <>
            <h3 className="text-xl font-semibold mb-4">
              Chi tiết ngày {dayjs(selectedPoint.date).format('DD/MM/YYYY')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-medium mb-2 text-blue-600">Các hóa đơn đã thanh toán:</p>
                {selectedPoint.paidUUIDs.length > 0 ? (
                  selectedPoint.paidUUIDs.map((id) => (
                    <p key={id} className="text-gray-700">
                      {id}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-500">Không có hóa đơn nào</p>
                )}
              </div>
              <div>
                <p className="font-medium mb-2 text-red-600">Các hóa đơn đã hoàn tiền:</p>
                {selectedPoint.refundedUUIDs.length > 0 ? (
                  selectedPoint.refundedUUIDs.map((id) => (
                    <p key={id} className="text-gray-700">
                      {id}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-500">Không có hóa đơn nào</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Chọn một điểm trên biểu đồ để xem chi tiết hoặc xem thông tin mặc định.</p>
        )}
      </div>
    </div>
  )
}
