import dynamic from 'next/dynamic'

const Attend = dynamic(() => import('@/components/attend/attend'), { ssr: false, loading: () => <div>Loading...</div> })

export default function AttendDynamic() {
  return <Attend />
}
