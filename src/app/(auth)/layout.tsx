import NavigationWithBg from '@/components/navWithBg'
import { Suspense } from 'react'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: {
    default: 'Share2Receive - Đăng nhập & Đăng ký',
    template: '%s | Share2Receive',
  },
  description:
    'Share2Receive - Nền tảng trao đổi đồ dùng thời trang hàng đầu Việt Nam, giúp tủ đồ gọn gàng và bảo vệ môi trường',
  keywords: ['trao đổi đồ', 'thời trang bền vững', 'second hand', 'tủ đồ thông minh', 'share2receive'],
  authors: [{ name: 'Share2Receive Team' }],
  creator: 'Share2Receive',
  publisher: 'Share2Receive',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://share2receive.com/login',
  },
}

const navLinks = [
  {
    href: '/login',
    label: 'Đăng nhập',
  },
  {
    href: '/register',
    label: 'Đăng ký',
  },
  {
    href: '/forgot-password',
    label: 'Quên mật khẩu',
  },
]

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Suspense>
        <NavigationWithBg navLink={navLinks} />
        <div className="mt-24">{children}</div>
      </Suspense>
    </>
  )
}
