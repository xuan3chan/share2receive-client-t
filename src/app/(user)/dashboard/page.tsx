import dynamic from 'next/dynamic'

const DashboardPage = dynamic(() => import('@/components/dashboard/dashboardPage'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

export default function Dashboard() {
  return (
    <>
      <DashboardPage />
    </>
  )
}
