'use client'

import { OrderById } from '@/types/orderTypes'
import Image from 'next/image'
import { formatPrice } from '@/helper/format'
import { useGetName } from '@/helper/getName'
import IconifyIcon from '../icons'
import { Button, Divider, Radio, Stack, Popover, ActionIcon } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useOrderStore } from '@/zustand/order'
import checkoutService, { Success } from '@/services/checkout/checkout.service'
import NavigateToMomo from './navigateToMomo'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import orderService from '@/services/order/order.service'
import { mutate } from 'swr'
import { Descriptions } from 'antd'
import { useCheckoutStore } from '@/zustand/checkout'
import { useWalletStore } from '@/zustand/wallet'

export default function CheckoutPage({ order }: { order: OrderById }) {
  const { getColorName } = useGetName()
  const { wallet } = useWalletStore()
  const searchParams = useSearchParams()
  const callback = searchParams.get('callback')
  const [paymentMethod, setPaymentMethod] = useState('2')
  const { toggleChangeAddressModal, setIdOrder, setAddress, setPhone, setSubOrder } = useOrderStore()
  const [payUrl, setPayUrl] = useState('')
  const { user } = useAuth()
  const { toggleEdit, toggleEditNote } = useCheckoutStore()
  const router = useRouter()

  useEffect(() => {
    if (user?.address && user?.phone && !order.data.address && !order.data.phone) {
      orderService.updateAddressOrder(
        order.data._id,
        {
          address: user?.address || '',
          phone: user?.phone || '',
          type: 'momo_wallet',
        },
        () => {
          setAddress(user?.address || '')
          setPhone(user?.phone || '')
          mutate(['/order/id', order.data._id])
        },
      )
    }
  }, [user, order, setAddress, setPhone])

  const handleMomoPayment = async () => {
    if (!order.data.address || !order.data.phone) {
      toast.error('Vui lòng điền địa chỉ nhận hàng')
      return
    }
    if (paymentMethod === '1') {
      await checkoutService.codPayment(order.data._id, () => {
        toast.success('Đặt hàng thành công, chuyển hướng đến trang chi tiết đơn hàng')
        mutate(['/order/id', order.data._id])
        router.push(`/checkout/${order.data._id}?callback=orders-management`)
      })
    } else if (paymentMethod === '2') {
      await checkoutService.momoPayment(order.data._id, (res: Success) => {
        setPayUrl(res.response.payUrl)
      })
    } else if (paymentMethod === '3') {
      await checkoutService.walletPayment(
        order.data._id,
        () => {
          toast.success('Đặt hàng thành công, chuyển hướng đến trang chi tiết đơn hàng')
          mutate(['/order/id', order.data._id])
          router.push(`/checkout/${order.data._id}?callback=orders-management`)
        },
        (error) => {
          toast.error(error)
        },
      )
    }
  }

  const handleConfirmPayment = async () => {
    await checkoutService.confirmPayment(
      order.data._id,
      () => {
        mutate(['/order/id', order.data._id])
      },
      () => {
        toast.error('Cập nhật trạng thái thanh toán thất bại, vui lòng liên hệ với chúng tôi qua mail')
      },
    )
  }

  const handleDeleteSubOrder = async (subOrderId: string) => {
    await orderService.deleteSubOrder(
      subOrderId,
      () => {
        mutate(['/order/id', order.data._id])
        toast.success('Xóa đơn hàng thành công')
      },
      () => {
        toast.error('Xóa đơn hàng thất bại, vui lòng liên hệ với chúng tôi qua mail')
      },
    )
  }

  const handleDeleteOrderProduct = async (subOrderId: string, productId: string) => {
    await orderService.deleteOrderProduct(
      subOrderId,
      productId,
      () => {
        mutate(['/order/id', order.data._id])
        toast.success('Xóa sản phẩm thành công')
      },
      () => {
        toast.error('Xóa sản phẩm thất bại, vui lòng liên hệ với chúng tôi qua mail')
      },
    )
  }

  return (
    <>
      <NavigateToMomo payUrl={payUrl} setPayUrl={setPayUrl} />
      <div className="container mx-auto px-2 md:px-36 py-10 md:pt-20">
        {callback === 'orders-management' && (
          <Link
            href="/orders-management"
            className="text-green-900 text-md font-semibold flex flex-row gap-2 items-center"
          >
            <IconifyIcon icon="icon-park-outline:left-two" className="w-6 h-6" /> Quay lại trang đơn hàng của bạn
          </Link>
        )}

        <div className="flex flex-row justify-between space-x-6">
          <div className="w-2/3 flex flex-col gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold">1. Sản phẩm thanh toán</h1>
              <div className="w-full">
                {/* make a table */}
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="col-span-4"></th>
                      <th className="text-gray-500 text-lg font-normal">Số lượng</th>
                      <th className="text-gray-500 text-lg font-normal">Thành tiền</th>
                      <th className="text-gray-500 text-lg font-normal">Hủy bỏ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.data.subOrders.map((subOrder) => (
                      <>
                        <tr className="bg-white">
                          <td colSpan={1} className="py-2 ">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                <div className="flex flex-row gap-2 items-center">
                                  <span>Người bán:</span>
                                  <Image
                                    src={subOrder.sellerId.avatar}
                                    alt={subOrder.sellerId.firstname + ' ' + subOrder.sellerId.lastname}
                                    width={25}
                                    height={25}
                                    loading="lazy"
                                    quality={70}
                                    className="rounded-full"
                                  />
                                  {subOrder.sellerId.firstname + ' ' + subOrder.sellerId.lastname}
                                </div>
                              </span>
                            </div>
                          </td>
                          <td colSpan={2}></td>
                          <td className="text-center py-4">
                            <button onClick={() => handleDeleteSubOrder(subOrder._id)} className="text-red-500">
                              <IconifyIcon icon="iconamoon:trash" className="w-6 h-6 text-red-900" />
                            </button>
                          </td>
                        </tr>
                        {subOrder.products.map((product) => (
                          <tr key={product._id} className="border-b border-gray-200">
                            <td className="py-4">
                              <div className="flex flex-row gap-4">
                                <div className="w-[90px] h-[130px] relative rounded-md overflow-hidden">
                                  <Image
                                    src={product.productId.imgUrls[0]}
                                    alt={product.productName}
                                    width={100}
                                    height={100}
                                    loading="lazy"
                                    quality={70}
                                    className="object-cover absolute top-0 left-0 w-full h-full"
                                  />
                                </div>
                                <div className="flex flex-col gap-3 max-w-[320px]">
                                  <div className="text-lg text-green-900 font-semibold text-wrap">
                                    {product.productName}
                                  </div>
                                  <div>
                                    <p className="text-md">Kích thước: {product.size}</p>
                                    <p className="text-md">Màu sắc: {getColorName(product.color)}</p>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="text-center py-4">{product.quantity}</td>
                            <td className="text-center py-4">{formatPrice(product.price) + 'đ'}</td>
                            <td className="text-center py-4">
                              <button
                                onClick={() => handleDeleteOrderProduct(subOrder._id, product._id)}
                                className="text-red-500"
                              >
                                <IconifyIcon icon="iconamoon:trash" className="w-6 h-6 text-red-900" />
                              </button>
                            </td>
                          </tr>
                        ))}
                        <tr className="border-b border-gray-200">
                          <td colSpan={4}>
                            <Descriptions
                              bordered
                              size="small"
                              column={2}
                              style={{
                                borderRadius: '0px',
                              }}
                              labelStyle={{
                                fontSize: '12px',
                                margin: '5px',
                                padding: '5px',
                                width: '170px',
                              }}
                              contentStyle={{
                                minHeight: '80px',
                                padding: '12px',
                                minWidth: '150px',
                              }}
                              items={[
                                {
                                  label: 'Mã đơn hàng',
                                  span: 2,
                                  children: <p className="text-black font-semibold text-sm">{subOrder.subOrderUUID}</p>,
                                },
                                {
                                  label: 'Phương thức vận chuyển',
                                  span: 1,
                                  children: (
                                    <div className="h-full flex flex-col justify-between">
                                      <div>
                                        {subOrder.shippingService === 'GHN' && (
                                          <>
                                            <p className="text-black font-bold text-sm">Giao hàng nhanh</p>
                                            <p className="text-black font-normal text-xs">Standard Express</p>
                                            <p className="text-black font-normal text-xs">Nhận hàng trong 1-3 ngày</p>
                                            <p className="text-black font-normal text-xs flex flex-row gap-1 items-center">
                                              <span>Xem cách tính đơn giá vận chuyển</span>
                                              <Popover>
                                                <Popover.Target>
                                                  <ActionIcon variant="transparent" size="xs">
                                                    <IconifyIcon icon="mingcute:information-line" className="w-4 h-4" />
                                                  </ActionIcon>
                                                </Popover.Target>
                                                <Popover.Dropdown>
                                                  <p className="text-black font-normal text-xs">
                                                    Nội tỉnh: Không quá 3kg, giá giao hàng 22.000đ, mỗi 0,5kg tiếp theo
                                                    tính 2.500đ
                                                  </p>
                                                  <p className="text-black font-normal text-xs">
                                                    Liên tỉnh: Không quá 0.3kg (300gram), giá giao hàng 30.000đ, mỗi
                                                    0,5kg tiếp theo tính 5.000đ
                                                  </p>
                                                </Popover.Dropdown>
                                              </Popover>
                                            </p>
                                          </>
                                        )}
                                        {subOrder.shippingService === 'GHTK' && (
                                          <>
                                            <p className="text-black font-bold text-sm">Giao hàng tiết kiệm</p>
                                            <p className="text-black font-normal text-xs">Standard Express</p>
                                            <p className="text-black font-normal text-xs">Nhận hàng trong 3-5 ngày</p>
                                            <p className="text-black font-normal text-xs flex flex-row gap-1 items-center">
                                              <span>Xem cách tính đơn giá vận chuyển</span>
                                              <Popover>
                                                <Popover.Target>
                                                  <ActionIcon variant="transparent" size="xs">
                                                    <IconifyIcon icon="mingcute:information-line" className="w-4 h-4" />
                                                  </ActionIcon>
                                                </Popover.Target>
                                                <Popover.Dropdown>
                                                  <p className="text-black font-normal text-xs">
                                                    Nội tỉnh: Không quá 3kg, giá giao hàng 15.000đ, mỗi 0,5kg tiếp theo
                                                    tính 2.500đ
                                                  </p>
                                                  <p className="text-black font-normal text-xs">
                                                    Liên tỉnh: Không quá 0.5kg (500gram), giá giao hàng 29.000đ, mỗi
                                                    0,5kg tiếp theo tính 5.000đ
                                                  </p>
                                                </Popover.Dropdown>
                                              </Popover>
                                            </p>
                                          </>
                                        )}
                                        {subOrder.shippingService === 'agreement' && (
                                          <>
                                            <p className="text-black font-bold text-sm">Theo thỏa thuận</p>
                                          </>
                                        )}
                                      </div>
                                      <p
                                        className="text-green-900 text-xs underline mt-auto cursor-pointer"
                                        onClick={() => {
                                          toggleEdit()
                                          setIdOrder(subOrder._id)
                                          setSubOrder(subOrder)
                                        }}
                                      >
                                        Thay đổi
                                      </p>
                                    </div>
                                  ),
                                },
                                {
                                  label: 'Phí vận chuyển',
                                  span: 1,
                                  children: (
                                    <div className="h-full flex items-center">
                                      <p className="text-black font-semibold text-sm">
                                        {formatPrice(subOrder.shippingFee) + 'đ'}
                                      </p>
                                    </div>
                                  ),
                                },
                                {
                                  label: 'Ghi chú',
                                  span: 2,
                                  children: (
                                    <div className="w-full flex justify-between items-center">
                                      <p className="text-black font-normal text-sm">{subOrder.note}</p>
                                      <p
                                        className="text-green-900 text-xs underline mt-auto cursor-pointer"
                                        onClick={() => {
                                          toggleEditNote()
                                          setIdOrder(subOrder._id)
                                          setSubOrder(subOrder)
                                        }}
                                      >
                                        Thay đổi
                                      </p>
                                    </div>
                                  ),
                                },
                                {
                                  label: '',
                                  span: 1,
                                  children: <p className="text-black font-semibold text-sm text-right "></p>,
                                },
                                {
                                  label: 'Tổng tiền các sản phẩm',
                                  span: 1,
                                  children: (
                                    <p className="text-black font-semibold text-sm  ">
                                      {formatPrice(subOrder.subTotal) + 'đ'}
                                    </p>
                                  ),
                                },
                              ]}
                            />
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
                <div className="flex flex-row gap-2 items-center justify-end mt-4">
                  <p className="text-black">Tổng loại: {order.summary.totalTypes}</p>
                  <p className="text-black">Tổng số lượng: {order.summary.totalAmount}</p>
                </div>
                <Divider my="md" />
                <p className="text-green-900 text-center">
                  <IconifyIcon icon="icon-park-outline:information" className="w-6 h-6" />
                  <span>
                    Bạn có thể hủy đơn hàng khi đơn hàng đang ở trạng thái chờ xử lý. Đơn hàng sẽ không thể hủy sau khi
                    đơn hàng được giao cho đơn vị vận chuyển.
                  </span>
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold">2. Chọn hình thức thanh toán</h1>
              <div className="w-full">
                <Radio.Group name="paymentMethod" withAsterisk value={paymentMethod} onChange={setPaymentMethod}>
                  <Stack mt="xs">
                    <Radio
                      size="lg"
                      color="green"
                      value="1"
                      label={
                        <div className="flex flex-row gap-3 items-center">
                          <Image
                            src="/misc/cod-icon.svg"
                            alt="cod"
                            width={30}
                            height={30}
                            loading="lazy"
                            quality={70}
                          />
                          <p className="text-lg font-semibold">Thanh toán khi nhận hàng</p>
                        </div>
                      }
                    />
                    <Radio
                      size="lg"
                      color="green"
                      value="2"
                      label={
                        <div className="flex flex-row gap-3 items-center">
                          <Image
                            src="/misc/momo-icon.svg"
                            alt="momo"
                            width={30}
                            height={30}
                            loading="lazy"
                            quality={70}
                          />
                          <p className="text-lg font-semibold">
                            Cổng thanh toán điện tử MOMO (QR code, Visa, Mastercard, JCB)
                          </p>
                        </div>
                      }
                    />
                    <Radio
                      size="lg"
                      color="green"
                      value="3"
                      disabled={order.data.totalAmount >= 50000 || wallet.point < order.data.totalAmount ? true : false}
                      label={
                        <div className="flex flex-row gap-3 items-center">
                          <Image
                            src="/misc/latest.png"
                            alt="point"
                            width={30}
                            height={30}
                            loading="lazy"
                            quality={70}
                          />
                          <p className="text-lg font-semibold">Thanh toán bằng kim cương</p>
                        </div>
                      }
                    />
                    {wallet.point < order.data.totalAmount && (
                      <p className="text-red-500">Số kim cương của bạn không đủ để thanh toán đơn hàng này</p>
                    )}
                  </Stack>
                </Radio.Group>
              </div>
            </div>
          </div>
          <div className="w-1/3 flex flex-col gap-4">
            <div className="bg-white p-8  rounded-lg shadow-md flex flex-col gap-4">
              <h1 className="text-2xl font-bold">Địa chỉ nhận hàng</h1>
              <div className="w-full flex flex-col gap-2">
                <p className="text-xl font-semibold">
                  {order.data.userId.firstname + ' ' + order.data.userId.lastname}
                </p>
                {order.data.address && order.data.phone ? (
                  <>
                    <p className="text-xl">{order.data.phone}</p>
                    <p className="text-xl text-wrap max-w-full">{order.data.address}</p>
                    <div className="flex flex-row justify-end ">
                      <span
                        onClick={() => {
                          toggleChangeAddressModal()
                          setIdOrder(order.data._id)
                          setAddress(order.data.address)
                          setPhone(order.data.phone)
                        }}
                        className="text-md text-gray-500 cursor-pointer hover:text-green-900"
                      >
                        Sửa địa chỉ nhận hàng
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <Button
                      type="button"
                      style={{
                        backgroundColor: '#16a34a',
                        color: '#fff',
                      }}
                      onClick={() => {
                        toggleChangeAddressModal()
                        setIdOrder(order.data._id)
                      }}
                    >
                      Điền địa chỉ nhận hàng
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-4">
              <h1 className="text-2xl font-bold">Thông tin thanh toán</h1>
              <div className="w-full flex flex-col gap-2">
                <p className="text-lg font-normal flex justify-between">
                  Tổng tiền sản phẩm:{' '}
                  <span className="font-semibold text-black">{formatPrice(order.summary.totalPrice) + 'đ'}</span>
                </p>
                <p className="text-lg font-normal flex justify-between">
                  Phí vận chuyển:{' '}
                  <span className="font-semibold text-black">{formatPrice(order.summary.totalShippingFee) + 'đ'}</span>
                </p>
                <p className="text-xl font-normal flex justify-between">
                  Tổng tiền thanh toán:{' '}
                  <span className="font-semibold text-green-900">{formatPrice(order.data.totalAmount) + 'đ'}</span>
                </p>
              </div>
            </div>
            <Button
              type="button"
              disabled={!order.data.address || !order.data.phone}
              onClick={handleMomoPayment}
              style={{
                backgroundColor: !order.data.address || !order.data.phone ? '#ccc' : '#16a34a',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '30px',
                width: '100%',
                height: '80px',
              }}
            >
              {paymentMethod === '1' ? 'Đặt hàng' : 'Thanh toán'}
            </Button>
            {order.data.transactionId && order.data.paymentStatus === 'pending' && (
              <>
                <p className="text-green-900 text-center">Bạn đã thanh toán đơn hàng này?</p>
                <p className="text-green-900 text-center">
                  Hãy nhấn vào nút xác minh đã toán để cập nhật trạng thái thanh toán hoặc liên hệ với chúng tôi qua
                  mail{' '}
                  <a className="underline" href="mailto:share2recieve.support@gmail.com">
                    share2recieve.support@gmail.com{' '}
                  </a>
                  để được hỗ trợ
                </p>
                <Button
                  type="button"
                  disabled={!order.data.address || !order.data.phone}
                  onClick={handleConfirmPayment}
                  style={{
                    backgroundColor: !order.data.address || !order.data.phone ? '#ccc' : '#0A97B0',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    width: '100%',
                    height: '50px',
                  }}
                >
                  Xác nhận đã thanh toán
                </Button>
              </>
            )}
            {(!order.data.address || !order.data.phone) && (
              <p className="text-red-500 text-center">Vui lòng điền địa chỉ nhận hàng</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
