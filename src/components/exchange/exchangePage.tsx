'use client'
import { useExchange } from '@/zustand/exchange'
import exChangeService from '@/services/exchange/exchange.service'
import { Tabs } from 'antd'
import { ViewExchangeModal } from './requestertable/viewExchange'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { ViewExchangeModalRev } from './receivertable/viewExchangeRev'
import { Suspense, lazy } from 'react'
import Loading from '@/app/loading'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

const TableDataReq = lazy(() => import('./requestertable/tableDataReq'))
const TableDataRev = lazy(() => import('./receivertable/tableDataRev'))

const ExchangePage = () => {
  const { setExchange, exchangeId, setLoading, setExchangeRev, exchangeIdRev } = useExchange()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const activeTab = searchParams.get('tab') || 'requester'

  const handleTabChange = (key: string) => {
    router.push(`${pathname}?tab=${key}`)
  }

  useEffect(() => {
    if (exchangeId) {
      setLoading(true)
      exChangeService
        .getById(exchangeId)
        .then((data) => {
          if (data) {
            setExchange(data)
            setLoading(false)
          }
        })
        .catch(() => {
          toast.error('Lấy thông tin trao đổi thất bại')
          setLoading(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeId])

  useEffect(() => {
    if (exchangeIdRev) {
      setLoading(true)
      exChangeService
        .getById(exchangeIdRev)
        .then((data) => {
          if (data) {
            setExchangeRev(data)
            setLoading(false)
          }
        })
        .catch(() => {
          toast.error('Lấy thông tin trao đổi thất bại')
          setLoading(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeIdRev])

  return (
    <>
      <ViewExchangeModal />
      <ViewExchangeModalRev />
      <div className="container mx-auto px-1 md:px-10">
        <div className="title text-black text-2xl font-semibold">
          <h2>Quản lý trao đổi</h2>
        </div>
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          items={[
            {
              key: 'requester',
              label: 'Yêu cầu trao đổi của bạn',
              children: (
                <Suspense fallback={<Loading />}>
                  <TableDataReq />
                </Suspense>
              ),
            },
            {
              key: 'receiver',
              label: 'Yêu cầu trao đổi từ người khác',
              children: (
                <Suspense fallback={<Loading />}>
                  <TableDataRev />
                </Suspense>
              ),
            },
          ]}
        />
      </div>
    </>
  )
}

export default ExchangePage
