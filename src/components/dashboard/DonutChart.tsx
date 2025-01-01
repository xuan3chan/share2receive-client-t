import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Tooltip as TooltipMantine } from '@mantine/core'
import Image from 'next/image'

type ProductData = {
  productId: string
  productName: string
  imgUrls: string[]
  timesAdded: number
}

type DonutChartProps = {
  data: ProductData[]
}

const CHART_COLORS = [
  '#FF6384', // hồng đậm
  '#36A2EB', // xanh dương
  '#FFCE56', // vàng
  '#4BC0C0', // xanh ngọc
  '#9966FF', // tím
  '#FF9F40', // cam
  '#E7E9ED', // xám - dùng cho phần "Khác"
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <Image src={data.imgUrls[0]} alt={data.productName} width={100} height={100} className="rounded-md mb-2" />
        <p className="text-sm font-semibold">{data.productName}</p>
        <p className="text-sm">Số lần thêm: {data.timesAdded}</p>
      </div>
    )
  }
  return null
}

const CustomLegend = ({ payload }: any) => {
  return (
    <ul className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry: any, index: number) => (
        <li key={`legend-${index}`} className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
          <TooltipMantine label={entry.payload.productName} position="top" withArrow>
            <span className="text-sm text-gray-600">
              {entry.payload.productName.split(' ').slice(0, 3).join(' ')}({entry.payload.timesAdded} lần)
            </span>
          </TooltipMantine>
        </li>
      ))}
    </ul>
  )
}

export default function DonutChart({ data }: DonutChartProps) {
  // Sắp xếp data theo số lần thêm vào giỏ giảm dần
  const sortedData = [...data].sort((a, b) => b.timesAdded - a.timesAdded)

  // Lấy 6 sản phẩm đầu tiên
  const top6Products = sortedData.slice(0, 6)

  // Tính tổng số lần thêm của các sản phẩm còn lại
  const otherProducts = sortedData.slice(6)
  const otherTimesAdded = otherProducts.reduce((sum, product) => sum + product.timesAdded, 0)

  // Tạo data mới bao gồm top 6 và mục "Khác"
  const chartData = [
    ...top6Products,
    ...(otherTimesAdded > 0
      ? [
          {
            productId: 'others',
            productName: 'Khác',
            imgUrls: [''],
            timesAdded: otherTimesAdded,
          },
        ]
      : []),
  ]

  // Thay đổi phần tạo màu
  const chartColors = CHART_COLORS.slice(0, chartData.length)

  return (
    <>
      {data && (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={60} // Increased from 40
              outerRadius={120} // Increased from 80
              fill="#8884d8"
              cx="50%"
              cy="50%"
              paddingAngle={1}
              dataKey="timesAdded"
              nameKey="productName"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={chartColors[index]} />
              ))}
            </Pie>
            <Legend content={<CustomLegend />} verticalAlign="bottom" align="center" />
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </>
  )
}
