'use client'

import { Avatar, Menu, rem, Text, UnstyledButton, ScrollArea } from '@mantine/core'
import { Dropdown, MenuProps } from 'antd'
import Link from 'next/link'
import clsx from 'clsx'
import { IconSettings, IconTruck, IconLogout } from '@tabler/icons-react'
import Image from 'next/image'
import IconifyIcon from '@/components/icons'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useExchange } from '@/zustand/exchange'
import { useLoginModal } from '@/zustand/loginModal'
import { NotificationType } from '@/types/notificationType'
import { useUserAction } from '@/zustand/user'
import dynamic from 'next/dynamic'

const ChatDropdown = dynamic(() => import('@/components/chat/chatDropdown'), { ssr: false })

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Link prefetch href={'/orders-management'}>
        Đơn mua
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link prefetch href={'/sell-management'}>
        Đơn bán
      </Link>
    ),
  },
]

export default function LeftSection({
  notifications,
  handleViewNotification,
}: {
  notifications: NotificationType[]
  handleViewNotification: (notificationId: string, event: React.MouseEvent) => void
}) {
  const pathName = usePathname()
  const { logout, user } = useAuth()
  const { toogleExchangeModal, listExchangeRev } = useExchange()
  const { openModal } = useLoginModal()
  const { setOpenChatDropdown, rooms } = useUserAction()
  const isMobile = window.innerWidth < 768

  const unreadCount = notifications?.filter((notification) => !notification.isViewed).length || 0
  const pendingExchangeCount =
    listExchangeRev?.filter((exchange) => exchange.allExchangeStatus === 'pending').length || 0
  const unreadMessage = rooms?.reduce((total, room) => total + (room.unreadCount || 0), 0) || 0

  return (
    <>
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center">
          <div className="w-8 md:w-14">
            <Image
              src="/logo.png"
              quality={60}
              width={50}
              height={50}
              alt="Share2Receive"
              loading="lazy"
              className="mr-1 p-1"
            />
          </div>
          <Link href="/">
            <h1 className="text-green-800 text-xl md:text-3xl font-semibold">
              Share
              <span style={{ color: 'salmon' }}>2</span>
              Receive
            </h1>
          </Link>
        </div>
        <div className="nav ml-6 hidden md:block">
          <ul className="nav-list flex flex-row uppercase">
            <li>
              <Link
                className={clsx('block nav-item px-4 py-5 font-bold text-green-900 cursor-pointer hover:bg-green-200', {
                  'bg-green-100': pathName === '/',
                })}
                href="/"
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                className={clsx('block nav-item px-4 py-5 font-bold text-green-900 cursor-pointer hover:bg-green-200', {
                  'bg-green-100': pathName === '/shop',
                })}
                href="/shop"
              >
                Cửa hàng
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <div className="md:hidden flex items-center gap-2">
            <div
              className={clsx('flex items-center', {
                hidden: !user,
              })}
            >
              <UnstyledButton onClick={() => toogleExchangeModal()} className="relative">
                <IconifyIcon icon="carbon:ibm-data-product-exchange" className="text-green-900 md:text-2xl" />
                {pendingExchangeCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {pendingExchangeCount}
                  </span>
                )}
              </UnstyledButton>
            </div>
            <div
              className={clsx('flex items-center', {
                hidden: !user,
              })}
            >
              <Menu shadow="md" width={300} closeOnItemClick={false}>
                <Menu.Target>
                  <UnstyledButton className="relative">
                    {unreadCount > 0 ? (
                      <IconifyIcon icon="iconamoon:notification-fill" className="text-green-900 md:text-2xl" />
                    ) : (
                      <IconifyIcon icon="iconamoon:notification-light" className="text-green-900 md:text-2xl" />
                    )}
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Thông báo</Menu.Label>
                  <ScrollArea h={400}>
                    {notifications && notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <Menu.Item
                          key={notification._id}
                          onClick={(event) => handleViewNotification(notification._id, event)}
                        >
                          <div className="flex flex-col">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Text size="sm" fw={500}>
                                  {notification.title}
                                </Text>
                                {!notification.isViewed && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
                              </div>
                              {notification.isViewed && (
                                <Text size="xs" c="dimmed">
                                  Đã xem
                                </Text>
                              )}
                            </div>
                            <Text size="xs" c="dimmed">
                              {notification.content}
                            </Text>
                          </div>
                        </Menu.Item>
                      ))
                    ) : (
                      <Menu.Item>Chưa có thông báo nào</Menu.Item>
                    )}
                  </ScrollArea>
                </Menu.Dropdown>
              </Menu>
            </div>
            {user && (
              <>
                <Dropdown placement="bottom" arrow menu={{ items }}>
                  <UnstyledButton>
                    <IconifyIcon icon="solar:bag-4-linear" className="text-green-900 md:text-2xl" />
                  </UnstyledButton>
                </Dropdown>
                <Menu
                  shadow="md"
                  width={isMobile ? 300 : 400}
                  closeOnItemClick={true}
                  position="bottom"
                  onClose={() => setOpenChatDropdown(false)}
                  withArrow
                  offset={0}
                >
                  <Menu.Target>
                    <UnstyledButton onClick={() => setOpenChatDropdown(true)} className="relative">
                      <IconifyIcon icon="mynaui:chat" className="text-green-900 md:text-2xl" />
                      {unreadMessage > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {unreadMessage}
                        </span>
                      )}
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>
                      <p className="text-md md:text-2xl font-bold text-black">Tin nhắn</p>
                    </Menu.Label>
                    <ChatDropdown />
                  </Menu.Dropdown>
                </Menu>
              </>
            )}

            {!user ? (
              // <Avatar size={rem(30)} onClick={() => openModal()} color="#2b8a3e" />
              <div className="flex items-center gap-2" onClick={() => openModal()}>
                <p className="text-xs font-medium text-green-900">Đăng nhập/Đăng ký</p>
              </div>
            ) : (
              <>
                <Menu shadow="md" width={250}>
                  <Menu.Target>
                    <div className="flex items-center cursor-pointer">
                      <Avatar
                        src={user.avatar}
                        alt={user.firstname}
                        radius={rem(24)}
                        size={isMobile ? rem(24) : rem(40)}
                      />
                    </div>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Link href="/profile">
                      <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                        Thông tin tài khoản
                      </Menu.Item>
                    </Link>
                    <Link href="/product-management">
                      <Menu.Item leftSection={<IconTruck style={{ width: rem(14), height: rem(14) }} />}>
                        Quản lý sản phẩm
                      </Menu.Item>
                    </Link>
                    <Menu.Item
                      onClick={() => logout()}
                      color="red"
                      leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                    >
                      Đăng xuất
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
