'use client'

import { useProductClient } from '@/zustand/productClient'
import { Modal } from '@mantine/core'

export default function CodModal() {
  const { openCodeModal, toggleCodeModal } = useProductClient()

  return (
    <Modal
      opened={openCodeModal}
      onClose={toggleCodeModal}
      centered
      title={<h1 className="text-3xl text-green-800">Các quy tắc COD</h1>}
      size="xl"
    >
      <div className="p-5">
        <p className="text-base font-medium whitespace-pre-wrap">{`Dịch vụ thanh toán khi nhận hàng chỉ khả dụng khi tổng số tiền từ 0đ đến 5.000.000đ sau khi giảm giá. Không cần chịu phí COD.

Share2Receive không hỗ trợ được kiểm tra hàng trước khi thanh toán

Trong các trường hợp sau, không hỗ trợ được dịch vụ COD:

1. Thành phố được lựa chọn không hỗ trợ dịch vụ COD hiện nay(bộ phận CSKH sẽ hướng dẫn chi tiết).
2. Số điện thoại không chính xác.
3. Có hơn một đơn hàng trước mà bạn chưa ký nhận. Xin vui lòng hoàn thành ký nhận cho nó trước khi bạn đặt một đơn hàng mới.
4. Theo lịch sử đơn đặt hàng trước đây của bạn, dịch vụ COD của bạn đã bị hạn chế trên Share2Receive.`}</p>
      </div>
    </Modal>
  )
}
