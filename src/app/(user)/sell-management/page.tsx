import { RessonOrder } from '@/constants/resson'
import dynamic from 'next/dynamic'

const SellPage = dynamic(() => import('@/components/sell-management/sell'), { ssr: false })
const ReportModal = dynamic(() => import('@/components/checkout/reportModal'), { ssr: false })

export default function SellManagement() {
  return (
    <>
      <SellPage />
      <ReportModal reportType="order" resson={RessonOrder} />
    </>
  )
}
