'use client'

import { navLink } from '@/types/navTypes'
import { Avatar, Layout, Menu, Drawer, Button } from 'antd'
import { useAuth } from '@/hooks/useAuth'
import { IconUserCircle, IconMenu2 } from '@tabler/icons-react'
import { useProfileLinks } from '@/navigation/profile/type'
import { usePathname } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'
import { useMediaQuery } from '@mantine/hooks'
import { lazy } from 'react'

const NavigationProfile = lazy(() => import('@/components/navProfile'))

export const dynamic = 'force-dynamic'

const { Content, Sider } = Layout

const navLinks: navLink[] = [
  {
    href: '/profile',
    label: 'Thông tin tài khoản',
  },
  {
    href: '/change-password',
    label: 'Đổi mật khẩu',
  },
  {
    href: '/product-management',
    label: 'Quản lý sản phẩm',
  },
  {
    href: '/exchange-management',
    label: 'Đổi trả',
  },
  {
    href: '/orders-management',
    label: 'Đơn hàng của tôi',
  },
  {
    href: '/banking-infor',
    label: 'Thông tin ngân hàng',
  },
  {
    href: '/user-style',
    label: 'Phong cách',
  },
  {
    href: '/transaction-management',
    label: 'Lịch sử giao dịch',
  },
]

export default function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isDesktop = useMediaQuery('(min-width: 62em)')
  const { user } = useAuth()
  const pathname = usePathname()
  const selectedKey = pathname.split('/')[1] || 'profile'
  const profileLinks = useProfileLinks()
  const [openDrawer, setOpenDrawer] = useState(false)

  useEffect(() => {
    if (isDesktop) {
      setOpenDrawer(false)
    }
  }, [isDesktop])

  const ProfileSidebar = () => (
    <>
      <div className="profile-avatar bg-white flex items-center gap-3 justify-start pb-6">
        <div className="avatar">
          <Avatar src={user?.avatar} alt="avatar" size={isDesktop ? 80 : 50} icon={<IconUserCircle size={30} />} />
        </div>
        <div className="infor flex flex-col justify-start items-start">
          <p className="text-sm md:text-lg">Tài khoản</p>
          <p className="text-sm md:text-lg">Share2Receive của</p>
          <h2 className="text-left text-xl md:text-2xl font-semibold">{user?.firstname + ' ' + user?.lastname}</h2>
        </div>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['profile']}
        style={{ height: 'auto', backgroundColor: 'white', fontSize: isDesktop ? '16px' : '14px' }}
        selectedKeys={[selectedKey]}
        items={profileLinks}
        className="text-sm md:text-base"
      />
    </>
  )

  return (
    <>
      <Suspense>
        <Suspense>
          <NavigationProfile navLink={navLinks} />
        </Suspense>
        <div className="container mx-auto bg-white mt-40 mb-10">
          <div className="lg:hidden flex justify-start p-4">
            <Button icon={<IconMenu2 size={24} />} onClick={() => setOpenDrawer(true)} className="flex items-center" />
          </div>

          <Drawer
            placement="left"
            onClose={() => setOpenDrawer(false)}
            open={openDrawer}
            width={300}
            className="lg:hidden"
          >
            <ProfileSidebar />
          </Drawer>

          <Layout className="h-[120%]">
            <Sider
              width={350}
              breakpoint="lg"
              collapsedWidth="0"
              className="hidden lg:block"
              style={{
                backgroundColor: 'white',
                borderRight: '1px solid #f0f0f0',
              }}
            >
              <ProfileSidebar />
            </Sider>

            <Layout>
              <Content style={{ height: 'auto', padding: '0 16px' }}>
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              </Content>
            </Layout>
          </Layout>
        </div>
      </Suspense>
    </>
  )
}
