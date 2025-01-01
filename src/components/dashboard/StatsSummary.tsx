'use client'

import { StatisticSellerType } from '@/types/statisticType'
import { memo } from 'react'
import { motion } from 'framer-motion'

interface StatsSummaryProps {
  data: StatisticSellerType
}

const StatsSummary: React.FC<StatsSummaryProps> = memo(({ data }) => {
  const summaries = [
    {
      title: 'Tổng tiền đã thanh toán',
      value: data.allSummary.totalPaid,
      color: 'text-green-800',
    },
    {
      title: 'Tổng hoàn tiền',
      value: data.allSummary.totalRefund,
      color: 'text-green-800',
    },
    {
      title: 'Tổng phí vận chuyển',
      value: data.allSummary.totalShippingFee,
      color: 'text-green-800',
    },
    {
      title: 'Tổng doanh thu',
      value: data.allSummary.totalSubTotal,
      color: 'text-green-800',
    },
  ]

  return (
    <div className="bg-white p-5 rounded-lg shadow-lg w-full md:w-3/5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {summaries.map((item, index) => (
          <motion.div
            key={index}
            className={`h-[210px] border rounded-lg p-4 ${item.color} flex flex-col flex-1 justify-center items-center`}
            whileHover={{ translateY: -5, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)' }}
          >
            <span className="text-lg font-medium bg-white px-1 py-1 rounded-full">{item.title}</span>
            <span className="mt-4 text-4xl font-bold">
              {item.value.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
})

StatsSummary.displayName = 'StatsSummary'

export default StatsSummary
