'use client'
import { Drawer, Divider, Image as AntdImage, Button, Tooltip, notification, Spin } from 'antd'
import { useExchange } from '@/zustand/exchange'
import { useAuth } from '@/hooks/useAuth'
import exChangeService from '@/services/exchange/exchange.service'
import useSWR, { mutate } from 'swr'
import { Avatar } from '@mantine/core'
import IconifyIcon from '../icons'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useGetName } from '@/helper/getName'
import { useMediaQuery } from '@mantine/hooks'
import dynamic from 'next/dynamic'

const Login = dynamic(() => import('./login'), { ssr: false, loading: () => <div>Loading...</div> })

const ExChangeDrawer = () => {
  const { user } = useAuth()
  const {
    openExchangeModal,
    toogleExchangeModal,
    listExchangeRev,
    setListExchange,
    setOpenViewExchangeModalRev,
    setExchangeIdRev,
  } = useExchange()
  const param = useSearchParams()
  const limit = Number(param.get('limit')) || 10
  const filterUserIds = param.getAll('filterUserId')
  const { getColorName } = useGetName()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const { data, mutate: refresh } = useSWR(user ? ['listExchange', page] : null, () =>
    exChangeService.getAll(page, 10, '', 'receiver'),
  )

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setListExchange(data?.data)
      } else {
        setListExchange([...(listExchangeRev || []), ...data?.data])
      }
      setTotalItems(data?.total)
      setTotalPages(Math.ceil(data?.total / 10))
      setHasMore(page < Math.ceil(data?.total / 10))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, data])

  const loadMore = async () => {
    try {
      setLoading(true)
      setPage((prev) => prev + 1)
      await refresh()
    } finally {
      setLoading(false)
    }
  }

  const [api, contextHolder] = notification.useNotification()

  if (!user) {
    return (
      <Login
        open={openExchangeModal}
        close={() => {
          toogleExchangeModal()
          setPage(1)
        }}
      />
    )
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  const handleAcceptExchange = (exchangeId: string) => {
    exChangeService
      .approve(exchangeId, 'accepted')
      .then(async () => {
        api.success({
          message: 'Chấp nhận trao đổi thành công',
          placement: 'topLeft',
        })
        setTimeout(() => {
          refresh()
          mutate(['exchangesRev', page, limit, ...filterUserIds])
          mutate(['exchanges', page, limit, ...filterUserIds])
        }, 1000)
      })
      .catch(() => {
        api.error({
          message: 'Chấp nhận trao đổi thất bại',
          description: 'Vui lòng thử lại sau',
          placement: 'topLeft',
        })
      })
  }

  const handleRejectExchange = (exchangeId: string) => {
    exChangeService
      .approve(exchangeId, 'rejected')
      .then(async () => {
        api.success({
          message: 'Từ chối trao đổi thành công',
          placement: 'topLeft',
        })
        setTimeout(() => {
          refresh()
          mutate(['exchangesRev', page, limit, ...filterUserIds])
          mutate(['exchanges', page, limit, ...filterUserIds])
        }, 1000)
      })
      .catch(() => {
        api.error({
          message: 'Từ chối trao đổi thất bại',
          description: 'Vui lòng thử lại sau',
          placement: 'topLeft',
        })
      })
  }

  return (
    <>
      {contextHolder}
      <Drawer
        title="Các sản phẩm trao đổi"
        placement="right"
        width={800}
        onClose={toogleExchangeModal}
        open={openExchangeModal}
      >
        <div className="container mx-auto">
          <div className="w-full">
            <div className="text-center text-xl md:text-3xl font-medium text-green-900">
              <h1>Danh sách các sản phẩm trao đổi</h1>
            </div>
            <div className="flex flex-col justify-between">
              {[...(listExchangeRev || [])]?.reverse()?.map((exchange) => {
                if (exchange.role === 'receiver')
                  return (
                    <>
                      <Divider
                        style={{
                          borderColor: 'black',
                          borderWidth: 1,
                          borderStyle: 'solid',
                          marginTop: 10,
                        }}
                      />
                      <Tooltip title="Click vào để xem chi tiết">
                        <Link
                          href="/exchange-management?tab=receiver"
                          className="text-black"
                          style={{ textDecoration: 'none', color: '#000' }}
                        >
                          <div
                            className="flex flex-col items-start my-4 cursor-pointer hover:bg-gray-100 rounded-md p-2"
                            onClick={() => {
                              setTimeout(() => {
                                setOpenViewExchangeModalRev(true)
                              }, 1000)
                              setExchangeIdRev(exchange._id)
                              toogleExchangeModal()
                            }}
                          >
                            <div className="flex flex-row items-center">
                              <Avatar
                                size={isMobile ? 40 : 50}
                                src={exchange?.requesterId.avatar}
                                alt={exchange?.requesterId.firstname + ' ' + exchange?.requesterId.lastname}
                              />
                              <div className="flex flex-col ml-1 md:ml-4">
                                <h1 className="text-sm md:text-lg font-medium">
                                  {exchange?.requesterId.firstname +
                                    ' ' +
                                    exchange?.requesterId.lastname +
                                    ' (đề xuất trao đổi)'}
                                </h1>
                                <p className="text-sm text-gray-500">{exchange?.requesterId?.email}</p>
                              </div>
                            </div>
                            <p className="mt-3 text-xs md:text-base">Sản phẩm muốn trao đổi: </p>
                            <div className="flex flex-col md:flex-row justify-between items-center w-full">
                              <div className="flex flex-row items-start justify-between gap-3">
                                <div className="relative h-full min-h-[120px] max-h-[120px] my-2 overflow-hidden ">
                                  <AntdImage
                                    src={exchange?.requestProduct?.requesterProductId.imgUrls[0]}
                                    alt={exchange?.requestProduct?.requesterProductId.productName}
                                    width={100}
                                    height={120}
                                    style={{
                                      objectFit: 'cover',
                                      width: '100%',
                                      height: '100%',
                                      position: 'absolute',
                                      top: 0,
                                      left: 0,
                                      right: 0,
                                      bottom: 0,
                                      borderRadius: 10,
                                      border: '1px solid #000',
                                    }}
                                  />
                                </div>
                                <div className="p-3">
                                  <h1 className="text-xs md:text-base text-green-800 font-medium">
                                    {truncateText(exchange?.requestProduct?.requesterProductId.productName, 20)}
                                  </h1>
                                  <div className="flex items-center gap-2">
                                    <p className="text-xs md:text-base">Size: </p>
                                    <p className="text-xs md:text-base text-green-800 font-medium">
                                      {exchange?.requestProduct?.size}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <p className="text-xs md:text-base">Màu sắc: </p>
                                    <p className="text-xs md:text-base text-green-800 font-medium">
                                      {getColorName(exchange?.requestProduct?.colors)}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <p className="text-xs md:text-base">Số lượng: </p>
                                    <p className="text-xs md:text-base text-green-800 font-medium">
                                      {exchange?.requestProduct?.amount}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <p className="text-xs md:text-base">Ghi chú: </p>
                                    <p className="text-xs md:text-base text-green-800 font-medium text-wrap whitespace-pre-wrap">
                                      {exchange?.note}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {exchange?.allExchangeStatus === 'pending' && (
                                <div className="flex flex-row md:flex-col  gap-2">
                                  <Tooltip title="Chấp nhận">
                                    <Button
                                      type="primary"
                                      icon={<IconifyIcon icon="iconamoon:check-bold" />}
                                      onClick={() => handleAcceptExchange(exchange._id)}
                                    />
                                  </Tooltip>
                                  <Tooltip placement="bottom" title="Từ chối">
                                    <Button
                                      danger
                                      icon={<IconifyIcon icon="iconamoon:close-bold" />}
                                      onClick={() => handleRejectExchange(exchange._id)}
                                    />
                                  </Tooltip>
                                </div>
                              )}
                              {exchange?.allExchangeStatus === 'accepted' && (
                                <div className="">
                                  <p className="text-green-800 font-medium text-base py-1 px-2 bg-green-200 rounded-sm">
                                    Đã chấp nhận
                                  </p>
                                </div>
                              )}
                              {exchange?.allExchangeStatus === 'rejected' && (
                                <div className="">
                                  <p className="text-red font-medium text-base py-1 px-2 bg-red-200 rounded-sm">
                                    Đã từ chối
                                  </p>
                                </div>
                              )}
                              {exchange?.allExchangeStatus === 'completed' && (
                                <div className="">
                                  <p className="text-blue font-medium text-base py-1 px-2 bg-blue-200 rounded-sm">
                                    Hoàn thành
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      </Tooltip>
                    </>
                  )
              })}
              {hasMore && (
                <div className="flex flex-col items-center mt-4 gap-2">
                  <p className="text-gray-600">
                    Trang {page} / {totalPages} (Tổng {totalItems} sản phẩm)
                  </p>
                  <Button onClick={loadMore} disabled={loading} className="w-40">
                    {loading ? <Spin size="small" /> : 'Xem thêm'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default ExChangeDrawer
