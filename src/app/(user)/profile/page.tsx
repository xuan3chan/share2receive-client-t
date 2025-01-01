import Loading from '@/app/loading'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Profile = dynamic(() => import('@/components/profile/profilePage'))

export const metadata: Metadata = {
  title: 'Thông tin tài khoản',
}

const ProfilePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Profile />
    </Suspense>
  )
}

export default ProfilePage
