import Loading from '@/app/loading'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const BankingInfor = dynamic(() => import('@/components/banking-infor/bankingInfor'))

export default function BankingInforPage() {
  return (
    <Suspense fallback={<Loading />}>
      <BankingInfor />
    </Suspense>
  )
}
