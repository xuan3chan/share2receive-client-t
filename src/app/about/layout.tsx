import NavigationWithBg from '@/components/navWithBg'
import { navLink } from '@/types/navTypes'
import { Suspense } from 'react'

const navLinks: navLink[] = [
  {
    href: '/about',
    label: 'Thông tin về Share2Receive',
  },
]

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Suspense>
        <NavigationWithBg navLink={navLinks} />
        <div className="mt-36 container mx-auto px-4 md:px-24 mb-10">{children}</div>
      </Suspense>
    </>
  )
}
