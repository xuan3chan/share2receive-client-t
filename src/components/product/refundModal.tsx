'use client'

import { useProductClient } from '@/zustand/productClient'
import { Modal } from '@mantine/core'

export default function RefundModal() {
  const { openRefundModal, toggleRefundModal } = useProductClient()

  return (
    <Modal
      opened={openRefundModal}
      onClose={toggleRefundModal}
      centered
      title={<h1 className="text-3xl text-green-800">Chính sách hoàn tiền</h1>}
      size="xl"
    >
      <div className="p-5">
        <p className="text-base font-medium whitespace-pre-wrap">{`1. Hàng bị lỗi sản xuất
    - Mô tả: Sản phẩm có lỗi kỹ thuật hoặc chất lượng do nhà sản xuất, ví dụ:
    - Đường may bị lỗi.
    - Khóa kéo không hoạt động.
    - Vải bị rách hoặc hỏng khi chưa sử dụng.
    - Yêu cầu: Cần cung cấp bằng chứng như ảnh hoặc video và hóa đơn mua hàng.
2. Giao sai sản phẩm
    - Mô tả: Gửi nhầm màu sắc, kích thước, hoặc kiểu dáng.
    - Sản phẩm không đúng như mô tả hoặc khác so với đơn đặt hàng.
    - Yêu cầu: Sản phẩm phải còn nguyên tem, nhãn, và chưa qua sử dụng.
3. Sản phẩm bị hư hại trong quá trình vận chuyển
    - Mô tả: Sản phẩm bị rách, bẩn, hoặc hư hỏng do quá trình vận chuyển.
    - Yêu cầu: Cần cung cấp bằng chứng ngay sau khi nhận hàng.
4. Không đúng kích cỡ hoặc không vừa
    - Mô tả: Sản phẩm không đúng kích cỡ hoặc không vừa người (nếu có chính sách đổi trả/hoàn tiền cho trường hợp này).
    - Yêu cầu: Sản phẩm phải còn nguyên tem, nhãn, không có dấu hiệu sử dụng.
5. Khách hàng thay đổi ý định (theo chính sách cửa hàng)
    - Mô tả: Khách hàng không còn muốn sử dụng sản phẩm, ví dụ:
    - Không thích màu sắc.
    - Thay đổi sở thích.
    - Yêu cầu: Sản phẩm phải còn nguyên trạng.
    - Một số cửa hàng có thể trừ phí hoàn trả.
6. Sản phẩm không phù hợp với mô tả
    - Mô tả: Chất liệu, thiết kế, hoặc màu sắc khác biệt so với thông tin quảng cáo.
    - Yêu cầu: Chứng minh sự khác biệt thông qua ảnh chụp hoặc video.
7. Hàng khuyến mãi hoặc giảm giá
    - Mô tả: Một số cửa hàng có chính sách hoàn tiền cho hàng khuyến mãi nếu:
    - Sản phẩm bị lỗi.
    - Không giao đúng mô tả.
    - Lưu ý: Thường không áp dụng hoàn tiền khi khách hàng thay đổi ý định.
8. Không giao được hàng
    - Mô tả: Sản phẩm không được giao đến địa chỉ của khách hàng do lỗi của cửa hàng hoặc đơn vị vận chuyển.
    - Yêu cầu: Khách hàng có quyền yêu cầu hoàn tiền.
9. Trễ thời gian giao hàng (nếu có cam kết)
    - Mô tả: Đơn hàng bị giao trễ so với thời gian đã cam kết trước đó.
    - Yêu cầu: Khách hàng cần yêu cầu hoàn tiền nếu cửa hàng không thể khắc phục.
10. Chính sách bảo hành không được đáp ứng
    - Mô tả: Sản phẩm có lỗi trong thời gian bảo hành nhưng không được sửa chữa hoặc đổi mới theo cam kết.
    - Yêu cầu: Có hóa đơn và thông tin bảo hành đầy đủ.`}</p>
      </div>
    </Modal>
  )
}
