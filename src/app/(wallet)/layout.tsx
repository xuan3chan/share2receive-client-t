import { navLink } from '@/types/navTypes'
import { lazy, Suspense } from 'react'

const NavigationWithBg = lazy(() => import('@/components/navWithBg'))

export const dynamic = 'force-dynamic'

const navLinks: navLink[] = [
  {
    href: '/packet',
    label: 'Gói nạp',
  },
]

export default function PacketLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Suspense>
        <NavigationWithBg navLink={navLinks} />
        {children}
      </Suspense>
    </>
  )
}
