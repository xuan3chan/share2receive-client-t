'use client'

import { notification } from 'antd'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import notificationService from '@/services/notification/notification.service'
import { useSocket } from '@/hooks/useSocket'
import { useNotificationStore } from '@/zustand/notification'
import dynamic from 'next/dynamic'
import { useAuth } from '@/hooks/useAuth'
import { mutate as getData } from 'swr'

const LeftSection = dynamic(() => import('@/components/header/leftSection'), {
  ssr: false,
})
const MiddleSection = dynamic(() => import('@/components/header/middleSection'), {
  ssr: false,
})
const RightSection = dynamic(() => import('@/components/header/rightSection'), {
  ssr: false,
})

export default function Header() {
  const { notifications, setNotifications } = useNotificationStore()
  const [api, contextHolder] = notification.useNotification()
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [searchKey, setSearchKey] = useState('')
  const router = useRouter() // Using the router to handle navigation
  const { socket } = useSocket()
  const { user } = useAuth()

  const { mutate } = useSWR(
    // Only fetch if user exists
    user ? '/notifications' : null,
    () => notificationService.getNotifications(),
    {
      onSuccess: (data) => {
        setNotifications(data)
      },
      revalidateOnFocus: true,
      refreshInterval: 0,
      dedupingInterval: 10000,
      errorRetryCount: 3,
    },
  )

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowHeader(false) // Scrolling down
      } else {
        setShowHeader(true) // Scrolling up
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  useEffect(() => {
    if (socket) {
      socket.on('generalNotification', (newNotification) => {
        mutate()
        getData('/api/notifications')
        api.open({
          message: newNotification.title,
          description: newNotification.message,
          showProgress: true,
          pauseOnHover: true,
          duration: 5,
          placement: 'topRight',
        })
      })

      socket.on('messageNotification', (newNotification) => {
        getData('/api/messages/get-room')
        api.info({
          message: newNotification.title,
          description: newNotification.message,
          showProgress: true,
          pauseOnHover: true,
          duration: 5,
          placement: 'topRight',
        })
        mutate()
      })

      socket.on('authenticatedNotification', (newNotification) => {
        api.info({
          message: newNotification.title,
          description: newNotification.message,
          showProgress: true,
          pauseOnHover: true,
          duration: 5,
          placement: 'topRight',
        })
        mutate()
      })
    }
  }, [socket, mutate, api])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearchSubmit = (event: any) => {
    event.preventDefault()
    if (searchKey.trim()) {
      // Redirect to a search results page or handle the search
      router.push(`/shop?searchKey=${searchKey}`)
      setSearchKey('')
    }
  }

  const handleViewNotification = async (notificationId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    notificationService.updateNotification(notificationId)
    setTimeout(() => {
      mutate()
    }, 1000)
  }

  return (
    <>
      {contextHolder}
      <header
        id="header"
        className={clsx('fixed top-0 z-50 bg-white w-full transition-transform duration-300', {
          '-translate-y-full': !showHeader,
          'translate-y-0': showHeader,
        })}
      >
        <div className="main-nav md:container mx-auto px-4 py-2 pt-3 md:pt-0 md:py-0 md:px-24">
          <div className="flex flex-col md:flex-row justify-between items-center ">
            {/* Left section: Logo and Navigation have mobile in there */}
            <LeftSection handleViewNotification={handleViewNotification} notifications={notifications} />

            {/* Middle section: Search bar */}
            <MiddleSection handleSearchSubmit={handleSearchSubmit} searchKey={searchKey} setSearchKey={setSearchKey} />

            {/* Right section: Icons and User Menu */}
            <RightSection handleViewNotification={handleViewNotification} notifications={notifications} />
          </div>
        </div>
      </header>
    </>
  )
}
