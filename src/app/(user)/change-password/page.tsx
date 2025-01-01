import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const ChangePassword = dynamic(() => import('@/components/changePassword/changePassword'), {
  ssr: false,
})

export const metadata: Metadata = {
  title: 'Đổi mật khẩu',
}

const ChangePasswordPage = () => {
  return (
    <>
      <ChangePassword />
    </>
  )
}

export default ChangePasswordPage
