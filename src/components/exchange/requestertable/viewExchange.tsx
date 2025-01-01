'use client'
import { Modal } from 'antd'
import { useExchange } from '@/zustand/exchange'
import IconifyIcon from '../../icons'
import { Requester } from '../component/requester'
import { Receiver } from '../component/receiver'
import { useMediaQuery } from '@mantine/hooks'
export const ViewExchangeModal = () => {
  const {
    openViewExchangeModal,
    setOpenViewExchangeModal,
    exchange,
    setOpenPopconfirmDelivered,
    setOpenPopconfirmShipping,
    setExchangeId,
    loading,
  } = useExchange()
  const isDesktop = useMediaQuery('(min-width: 62em)')
  const onClose = () => {
    setOpenViewExchangeModal(false)
    setOpenPopconfirmDelivered(false)
    setOpenPopconfirmShipping(false)
    setExchangeId('')
  }

  console.log(exchange)

  if (exchange)
    return (
      <Modal
        centered
        title={
          <>
            <h2 className="font-medium text-xl md:text-2xl mb-2">Chi tiết trao đổi</h2>
          </>
        }
        open={openViewExchangeModal}
        onCancel={onClose}
        getContainer={false}
        footer={false}
        loading={loading}
        width={isDesktop ? '95%' : '100%'}
      >
        <>
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 md:gap-1 h-full">
            <Requester exchange={exchange} />
            <div className="h-full flex flex-col justify-center items-center my-4 md:my-0">
              <div className="flex flex-col justify-center items-center max-h-full min-h-[200px] md:min-h-[300px]">
                <IconifyIcon icon={isDesktop ? 'bi:arrow-right' : 'bi:arrow-down'} className="text-2xl text-gray-500" />
                {exchange?.allExchangeStatus && (
                  <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center md:text-left">
                    <h1 className="text-base md:text-lg font-medium">Trạng thái đơn hàng:</h1>
                    {exchange?.allExchangeStatus === 'pending' && (
                      <p className="text-base px-2 py-1 bg-yellow-500 text-white capitalize rounded-md shadow-sm">
                        Đang chờ xử lý
                      </p>
                    )}
                    {exchange?.allExchangeStatus === 'canceled' && (
                      <p className="text-base px-2 py-1 bg-red-500 text-white capitalize rounded-md shadow-sm">
                        Đã hủy
                      </p>
                    )}
                    {exchange?.allExchangeStatus === 'accepted' && (
                      <p className="text-base px-2 py-1 bg-blue-500 text-white capitalize rounded-md shadow-sm">
                        Đã chấp nhận
                      </p>
                    )}
                    {exchange?.allExchangeStatus === 'completed' && (
                      <p className="text-base px-2 py-1 bg-green-500 text-white capitalize rounded-md shadow-sm">
                        Đã hoàn thành
                      </p>
                    )}
                    {exchange?.allExchangeStatus === 'rejected' && (
                      <p className="text-base px-2 py-1 bg-red-800 text-white capitalize rounded-md shadow-sm">
                        Đã từ chối
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            <Receiver exchange={exchange} />
          </div>
        </>
      </Modal>
    )
}
