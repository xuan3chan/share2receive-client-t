import dynamic from 'next/dynamic'

const TransactionPage = dynamic(() => import('@/components/transaction/transactionPage'), { ssr: false })

export default function TransactionManagementPage() {
  return (
    <>
      <TransactionPage />
    </>
  )
}
