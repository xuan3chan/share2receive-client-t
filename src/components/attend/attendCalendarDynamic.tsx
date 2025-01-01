import dynamic from 'next/dynamic'

const AttendCalendar = dynamic(() => import('@/components/attend/attendCalendar'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

export default function AttendCalendarDynamic() {
  return <AttendCalendar />
}
