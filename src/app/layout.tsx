import type { Metadata } from 'next'
import { ColorSchemeScript } from '@mantine/core'
import { Montserrat } from 'next/font/google'
import { Providers } from '@/providers/providers'

import './globals.css'
import './layout.css'
import '@/styles/style.css'
import '@mantine/core/styles/global.css'
import '@mantine/carousel/styles.css'
import '@mantine/core/styles.layer.css'
import 'mantine-datatable/styles.layer.css'
import '@mantine/core/styles/Menu.css'
import '@mantine/dates/styles.css'
import '@mantine/charts/styles.css'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import { lazy, Suspense } from 'react'
// import Navigation from '@/components/mobile/navigation'

const apiDomain = process.env.NEXT_PUBLIC_API_URL

const Chat = lazy(() => import('@/components/chat/chat'))
const Exchange = lazy(() => import('@/components/exchange/exchange'))
const LoginDynamic = lazy(() => import('@/components/loginDynamic'))
const Cart = lazy(() => import('@/components/cart/cart'))
const AttendDynamic = lazy(() => import('@/components/attend/attendDynamic'))
const AttendCalendarDynamic = lazy(() => import('@/components/attend/attendCalendarDynamic'))
const Header = lazy(() => import('@/partials/header'))
const Footer = lazy(() => import('@/partials/footer'))

const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  preload: true,
  display: 'swap',
})

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: {
    default: 'Share2Receive - Nền tảng trao đổi đồ dùng thời trang',
    template: '%s | Share2Receive',
  },
  icons: {
    icon: '/favicon.ico',
  },
  description:
    'Share2Receive - Nền tảng trao đổi đồ dùng thời trang hàng đầu Việt Nam, giúp tủ đồ gọn gàng và bảo vệ môi trường',
  keywords: ['trao đổi đồ', 'thời trang bền vững', 'second hand', 'tủ đồ thông minh', 'share2receive'],
  authors: [{ name: 'Share2Receive Team' }],
  creator: 'Share2Receive',
  publisher: 'Share2Receive',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://share2receive-client.vercel.app',
  },
  openGraph: {
    title: 'Share2Receive - Nền tảng trao đổi đồ dùng thời trang',
    description: 'Share2Receive - Nền tảng trao đổi đồ dùng thời trang hàng đầu Việt Nam',
    url: 'https://share2receive-client.vercel.app',
    siteName: 'Share2Receive',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Share2Receive Preview Image',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Share2Receive - Nền tảng trao đổi đồ dùng thời trang',
    description: 'Share2Receive - Nền tảng trao đổi đồ dùng thời trang hàng đầu Việt Nam',
    images: ['/twitter-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      className="scroll-smooth [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-green-700"
      lang="en"
    >
      <head>
        <title>Share2Receive</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={`${apiDomain}/api`} />
        <link
          rel="preload"
          href="/fonts/Montserrat-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#16a34a" />
        <meta name="google-site-verification" content="dC_ZZ8dPqFvxMMMiFOeMIV2va5G0-K467cyjKles4lo" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo.png" />
        <link rel="canonical" href="https://share2receive-client.vercel.app" />
        <link rel="preconnect" href="https://www.youtube.com"></link>
        <ColorSchemeScript />
      </head>
      <body className={`antialiased relative ${montserrat.className}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Providers>
            <Header />
            <Exchange />
            <Cart />
            <main
              suppressHydrationWarning
              className={`relative mt-16 h-full min-h-screen scroll-smooth ${montserrat.className}`}
            >
              {/* <Navigation /> */}
              <LoginDynamic />
              {children}
            </main>
            <Chat />
            <div className="fixed top-[300px] right-0 z-50">
              <AttendDynamic />
            </div>
            <AttendCalendarDynamic />
            <Footer />
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}
