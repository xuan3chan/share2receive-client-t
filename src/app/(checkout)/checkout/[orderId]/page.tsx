'use client'

import ChangeAddressModal from '@/components/checkout/changeAddressModal'
import CheckoutPage from '@/components/checkout/checkoutPage'
import PurchasedPage from '@/components/checkout/purchasedPage'
import orderService from '@/services/order/order.service'
import { OrderById } from '@/types/orderTypes'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import useSWR from 'swr'
import Loading from '@/app/loading'
import Link from 'next/link'
import IconifyIcon from '@/components/icons'
import OpenEditShippingMethod from '@/components/checkout/openEditShippingMethod'
import OpenEditNote from '@/components/checkout/openEditNote'
import ReportModal from '@/components/checkout/reportModal'
import { RessonOrder } from '@/constants/resson'
const NavigationWithBgAlways = dynamic(() => import('@/components/navWithBgAlway'), {
  ssr: false,
})

export default function CheckoutPageId({ params }: { params: { orderId: string } }) {
  const navLinks = {
    href: `/checkout/${params.orderId}`,
    label: 'Thanh toán',
  }

  const [order, setOrder] = useState<OrderById | undefined>()

  const { isLoading } = useSWR(['/order/id', params.orderId], () => orderService.getOrderById(params.orderId), {
    onSuccess(data) {
      if (data) {
        setOrder(data)
        console.log(data)
      }
    },
    compare(a, b) {
      if (a !== b) {
        setOrder(b)
      }
      return false
    },
    revalidateOnFocus: true,
    revalidateOnMount: true,
  })

  if (isLoading) return <Loading />

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Đơn hàng không tồn tại</h1>
        <Link href="/" className="text-green-900 text-md font-semibold flex flex-row gap-2 items-center">
          <IconifyIcon icon="icon-park-outline:left-two" className="w-6 h-6" />
          Quay lại trang chủ
        </Link>
        <Link
          href="/orders-management"
          className="text-green-900 text-md font-semibold flex flex-row gap-2 items-center"
        >
          <IconifyIcon icon="icon-park-outline:left-two" className="w-6 h-6" />
          Quay lại trang đơn hàng của tôi
        </Link>
      </div>
    )
  }

  return (
    <>
      <NavigationWithBgAlways navLink={navLinks} />
      <ChangeAddressModal />
      <OpenEditShippingMethod orderId={params.orderId} />
      <OpenEditNote orderId={params.orderId} />
      <ReportModal reportType="order" resson={RessonOrder} />
      {order.data.paymentStatus === 'paid' ? (
        <PurchasedPage order={order} />
      ) : order.data.paymentStatus === 'PayPickup' ? (
        <PurchasedPage order={order} />
      ) : (
        <CheckoutPage order={order} />
      )}
    </>
  )
}
