import Loading from '@/app/loading'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const ExchangePage = dynamic(() => import('@/components/exchange/exchangePage'), { ssr: false })

export const metadata: Metadata = {
  title: 'Quản lý trao đổi',
  description: 'Quản lý trao đổi',
}

const Exchange = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ExchangePage />
    </Suspense>
  )
}

export default Exchange
