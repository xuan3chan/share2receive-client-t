import { TypeCategory } from '@/metadata/category'
import { Suspense, lazy } from 'react'
import Loading from '../loading'
import { Metadata } from 'next'
import Head from 'next/head'

const NavigationWithBg = lazy(() => import('@/components/navWithBg'))

export const metadata: Metadata = {
  title: {
    default: 'Cửa hàng',
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
    canonical: 'https://share2receive.com/shop',
  },
}

export const dynamic = 'force-dynamic'

const imageUrl = 'res.cloudinary.com'

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense fallback={<Loading />}>
      <Head>
        <link rel="preload" href={imageUrl} as="image" />
      </Head>
      <NavigationWithBg navLink={TypeCategory} />
      {children}
    </Suspense>
  )
}
