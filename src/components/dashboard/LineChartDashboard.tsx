import { StatisticSellerType } from '@/types/statisticType'
import { memo } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const LineChartDashboard = memo(
  ({ data, handlePointClick }: { data: StatisticSellerType; handlePointClick: (payload: any) => void }) => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={
            data?.dailyDetails?.map((item) => ({
              date: item.date,
              paidUUIDs: item.paidUUIDs,
              refundedUUIDs: item.refundedUUIDs,
              totalPaid: item.summary.totalPaid,
              totalRefund: item.summary.totalRefund,
              totalShippingFee: item.summary.totalShippingFee,
              totalSubTotal: item.summary.totalSubTotal,
            })) || []
          }
          onClick={(e) => {
            if (e && e.activePayload && e.activePayload.length > 0) {
              handlePointClick(e.activePayload[0].payload)
            }
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalPaid" stroke="blue" activeDot={{ r: 8 }} name="Tổng tiền đã thanh toán" />
          <Line type="monotone" dataKey="totalRefund" stroke="red" activeDot={{ r: 8 }} name="Tổng hoàn tiền" />
          <Line
            type="monotone"
            dataKey="totalShippingFee"
            stroke="green"
            activeDot={{ r: 8 }}
            name="Tổng phí vận chuyển"
          />
          <Line type="monotone" dataKey="totalSubTotal" stroke="orange" activeDot={{ r: 8 }} name="Tổng doanh thu" />
        </LineChart>
      </ResponsiveContainer>
    )
  },
)

LineChartDashboard.displayName = 'LineChartDashboard'

export default LineChartDashboard
