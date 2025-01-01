import Loading from '@/app/loading'
import { Metadata } from 'next'
import { Suspense, lazy } from 'react'

const UserStyle = lazy(() => import('@/components/userStyle/useStyle'))

export const metadata: Metadata = {
  title: 'Phong cách của bạn',
  description: 'Phong cách của bạn',
}

const UserStylePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <UserStyle />
    </Suspense>
  )
}

export default UserStylePage
