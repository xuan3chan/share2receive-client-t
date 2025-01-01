'use client'

import { Avatar, Menu, rem, Text, UnstyledButton, ScrollArea } from '@mantine/core'
import { Dropdown } from 'antd'
import Link from 'next/link'
import { IconSettings, IconTruck, IconLogout, IconClipboardData } from '@tabler/icons-react'
import IconifyIcon from '@/components/icons'
import { useAuth } from '@/hooks/useAuth'
import { useExchange } from '@/zustand/exchange'
import { useLoginModal } from '@/zustand/loginModal'
import { NotificationType } from '@/types/notificationType'
import { useUserAction } from '@/zustand/user'
import ChatDropdown from '../chat/chatDropdown'
import { useProductClient } from '@/zustand/productClient'
import { useCart } from '@/zustand/cart'
import { useRouter } from 'next/navigation'
import { useWalletStore } from '@/zustand/wallet'
import Image from 'next/image'

export default function RightSection({
  notifications,
  handleViewNotification,
}: {
  notifications: NotificationType[]
  handleViewNotification: (notificationId: string, event: React.MouseEvent) => void
}) {
  const { logout, user } = useAuth()
  const { toogleExchangeModal, listExchangeRev } = useExchange()
  const { openModal } = useLoginModal()
  const { setOpenChatDropdown, rooms } = useUserAction()
  const { toggleCartDrawer } = useProductClient()
  const { cartItems } = useCart()
  const { wallet } = useWalletStore()
  const router = useRouter()

  const unreadCount = notifications?.filter((notification) => !notification.isViewed).length || 0
  const pendingExchangeCount =
    listExchangeRev?.filter((exchange) => exchange.allExchangeStatus === 'pending').length || 0

  const unreadMessage = rooms?.reduce((total, room) => total + (room.unreadCount || 0), 0) || 0

  return (
    <>
      <div className="hidden space-x-3 w-full md:w-auto md:flex items-center">
        {/* notification */}
        {user && (
          <Menu shadow="md" width={300} closeOnItemClick={false}>
            <Menu.Target>
              <UnstyledButton className="relative">
                {unreadCount > 0 ? (
                  <IconifyIcon
                    icon="iconamoon:notification-fill"
                    className="text-green-900"
                    style={{
                      width: rem(29),
                      height: rem(29),
                    }}
                  />
                ) : (
                  <IconifyIcon
                    icon="iconamoon:notification-light"
                    className="text-green-900"
                    style={{
                      width: rem(29),
                      height: rem(29),
                    }}
                  />
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
        )}

        {user && (
          <>
            {/* message */}
            <Menu
              shadow="md"
              width={400}
              closeOnItemClick={true}
              position="bottom"
              onClose={() => setOpenChatDropdown(false)}
              withArrow
              offset={0}
            >
              <Menu.Target>
                <UnstyledButton onClick={() => setOpenChatDropdown(true)} className="relative">
                  <IconifyIcon
                    icon="mynaui:chat"
                    className="text-green-900"
                    style={{
                      width: rem(29),
                      height: rem(29),
                    }}
                  />
                  {unreadMessage > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadMessage}
                    </span>
                  )}
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>
                  <p className="text-2xl font-bold text-black">Tin nhắn</p>
                </Menu.Label>
                <ChatDropdown />
              </Menu.Dropdown>
            </Menu>
          </>
        )}
        {user && (
          <>
            {/* cart */}
            <UnstyledButton onClick={toggleCartDrawer} className="relative">
              {cartItems.length > 0 ? (
                <>
                  <IconifyIcon
                    icon="mynaui:cart-solid"
                    className="text-green-900"
                    style={{
                      width: rem(29),
                      height: rem(29),
                    }}
                  />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                </>
              ) : (
                <IconifyIcon
                  icon="mynaui:cart"
                  className="text-green-900"
                  style={{
                    width: rem(29),
                    height: rem(29),
                  }}
                />
              )}
            </UnstyledButton>
          </>
        )}
        {/* bag */}
        {user && (
          <Dropdown
            placement="bottom"
            arrow
            menu={{
              items: [
                {
                  key: '1',
                  label: <p>Đơn mua</p>,
                  onClick: () => {
                    router.push('/orders-management')
                  },
                },
                {
                  key: '2',
                  label: <p>Đơn bán</p>,
                  onClick: () => {
                    router.push('/sell-management')
                  },
                },
              ],
            }}
          >
            <UnstyledButton>
              <IconifyIcon
                icon="solar:bag-4-linear"
                className="text-green-900"
                style={{
                  width: rem(29),
                  height: rem(29),
                }}
              />
            </UnstyledButton>
          </Dropdown>
        )}
        {/* Avatar */}
        {user && (
          <UnstyledButton onClick={() => toogleExchangeModal()} className="relative">
            <IconifyIcon
              icon="carbon:ibm-data-product-exchange"
              className="text-green-900"
              style={{
                width: rem(30),
                height: rem(30),
              }}
            />
            {pendingExchangeCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {pendingExchangeCount}
              </span>
            )}
          </UnstyledButton>
        )}
        {user ? (
          <div className="flex flex-row items-center gap-2">
            <Avatar src={user.avatar} alt={user.firstname} radius={rem(24)} size={rem(35)} />
            <div className="flex flex-col">
              <Menu shadow="md" width={250}>
                <Menu.Target>
                  <div className="flex items-center cursor-pointer">
                    <div className="flex flex-col">
                      <Text size="xl" fw={500}>
                        {user.firstname + ' ' + user.lastname}
                      </Text>
                      <p className="font-normal text-sm text-blue-900 flex flex-row items-center">
                        <Image src="/misc/latest.png" alt="point" width={20} height={20} />
                        <span>{wallet?.point ? wallet.point + ' Kim cương' : 0 + ' Kim cương'}</span>{' '}
                      </p>
                    </div>
                  </div>
                </Menu.Target>
                <Menu.Dropdown>
                  <Link href="/packet">
                    <Menu.Item
                      leftSection={
                        <IconifyIcon
                          icon="hugeicons:wallet-add-01"
                          style={{
                            height: rem(14),
                            width: rem(14),
                          }}
                        />
                      }
                    >
                      Nạp kim cương
                    </Menu.Item>
                  </Link>
                  <Link href="/transaction-management">
                    <Menu.Item
                      leftSection={
                        <IconifyIcon
                          icon="solar:history-broken"
                          style={{
                            height: rem(14),
                            width: rem(14),
                          }}
                        />
                      }
                    >
                      Lịch sử giao dịch
                    </Menu.Item>
                  </Link>
                  <Link href="/profile">
                    <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                      Thông tin tài khoản
                    </Menu.Item>
                  </Link>
                  <Link href="/orders-management">
                    <Menu.Item leftSection={<IconClipboardData style={{ width: rem(14), height: rem(14) }} />}>
                      Đơn hàng của tôi
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
            </div>
          </div>
        ) : (
          <Text className="font-bold text-green-900 cursor-pointer" onClick={() => openModal()}>
            Đăng nhập/Đăng ký
          </Text>
        )}
      </div>
    </>
  )
}
