import NavigationWithBg from '@/components/navWithBg'
import SideBar from '@/components/terms/sidebar'
import { navLink } from '@/types/navTypes'
import { Suspense } from 'react'

const navLinks: navLink[] = [
  {
    href: '/terms-condition',
    label: 'Điều khoản',
  },
  {
    href: '/privacy-policy',
    label: 'Chính sách bảo mật',
  },
  {
    href: '/purchase-donation-conditions',
    label: 'Điều khoản mua hàng và quyên góp',
  },
]

export default function TermsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Suspense>
        <NavigationWithBg navLink={navLinks} />
        <div className="mt-48 container mx-auto px-4 md:px-24 mb-10">
          <div className="flex flex-row gap-10">
            <div className="w-1/3">
              {/* Sidebar */}
              <SideBar />
            </div>
            <div className="w-2/3">
              {/* Content */}
              {children}
            </div>
          </div>
        </div>
      </Suspense>
    </>
  )
}
