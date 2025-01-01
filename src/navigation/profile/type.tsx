import React from 'react'
import type { MenuProps } from 'antd'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import IconifyIcon from '@/components/icons'
import Image from 'next/image'

type MenuItem = Required<MenuProps>['items'][number]

export const useProfileLinks = () => {
  const { user } = useAuth()

  const profileLinks: MenuItem[] = [
    {
      key: 'dashboard',
      label: <p className="font-semibold text-lg text-black">Tổng quan</p>,
      type: 'group',
      children: [
        {
          key: 'dashboard',
          icon: <IconifyIcon icon="streamline:dashboard-3" style={{ fontSize: '1.5rem', color: '#000' }} />,
          label: (
            <Link href="/dashboard" className="text-sm md:text-lg font-thin">
              Tổng quan
            </Link>
          ),
        },
      ],
    },
    {
      key: 'account-infor',
      label: <p className="font-semibold text-lg text-black">Thông tin tài khoản</p>,
      type: 'group',
      children: [
        {
          key: 'profile',
          icon: <IconifyIcon icon="solar:user-outline" style={{ fontSize: '1.5rem', color: '#000' }} />,
          label: (
            <Link href="/profile" className="text-sm md:text-lg font-thin">
              Thông tin tài khoản
            </Link>
          ),
        },
        {
          key: 'banking-infor',
          icon: <IconifyIcon icon="solar:card-outline" style={{ fontSize: '1.5rem', color: '#000' }} />,
          label: (
            <Link href="/banking-infor" className="text-sm md:text-lg font-thin">
              Thông tin thanh toán
            </Link>
          ),
        },
        // Conditionally render the change-password option
        ...(user?.typeUser !== 'google'
          ? [
              {
                key: 'change-password',
                icon: <IconifyIcon icon="solar:lock-password-outline" style={{ fontSize: '1.5rem', color: '#000' }} />,
                label: (
                  <Link href="/change-password" className="text-sm md:text-lg font-thin">
                    Thay đổi mật khẩu
                  </Link>
                ),
              },
            ]
          : []),

        {
          key: 'user-style',
          icon: (
            <Image src="/images/icon-park-outline--personal-collection.png" alt="user-style" width={26} height={26} />
          ),
          label: (
            <Link href="/user-style" className="text-sm md:text-lg font-thin">
              Phong cách của bạn
            </Link>
          ),
        },
      ],
    },

    {
      key: 'product-management',
      label: <p className="font-semibold text-lg text-black">Quản lý</p>,
      type: 'group',
      children: [
        {
          key: 'transaction-management',
          icon: <IconifyIcon icon="solar:history-broken" style={{ fontSize: '1.5rem', color: '#000' }} />,
          label: (
            <Link href="/transaction-management" className="text-sm md:text-lg font-thin">
              Lịch sử giao dịch
            </Link>
          ),
        },
        {
          key: 'product-management',
          icon: <IconifyIcon icon="fluent-mdl2:product" style={{ fontSize: '1.5rem', color: '#000' }} />,
          label: (
            <Link href="/product-management" className="text-sm md:text-lg font-thin">
              Quản lý sản phẩm
            </Link>
          ),
        },
        {
          key: 'orders-management',
          icon: <IconifyIcon icon="lsicon:order-outline" style={{ fontSize: '1.5rem', color: '#000' }} />,
          label: (
            <Link href="/orders-management" className="text-sm md:text-lg font-thin">
              Đơn hàng của tôi
            </Link>
          ),
        },
        {
          key: 'sell-management',
          icon: <IconifyIcon icon="material-symbols:orders-outline" style={{ fontSize: '1.5rem', color: '#000' }} />,
          label: (
            <Link href="/sell-management" className="text-sm md:text-lg font-thin">
              Quản lý đơn bán
            </Link>
          ),
        },
        {
          key: 'exchange-management',
          icon: <IconifyIcon icon="carbon:ibm-data-product-exchange" style={{ fontSize: '1.5rem', color: '#000' }} />,
          label: (
            <Link href="/exchange-management" className="text-sm md:text-lg font-thin">
              Quản lý trao đổi
            </Link>
          ),
        },
      ],
    },
  ]

  return profileLinks
}
