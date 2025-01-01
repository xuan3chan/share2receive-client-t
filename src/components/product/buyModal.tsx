'use client'

import { useProductClient } from '@/zustand/productClient'
import { Modal } from '@mantine/core'

export default function BuyModal() {
  const { openBuyModal, toggleBuyModal } = useProductClient()

  return (
    <Modal
      opened={openBuyModal}
      onClose={toggleBuyModal}
      centered
      title={<h1 className="text-3xl text-green-800">Các chích sách mua bán, trao đổi, quyên góp</h1>}
      size="70%"
    >
      <div className="p-5">
        <p className="text-base font-medium whitespace-pre-wrap">{`1. Đăng tin sản phẩm
Để đảm bảo chất lượng thông tin và minh bạch trong giao dịch, người đăng sản phẩm cần tuân thủ các yêu cầu sau:
  Hình ảnh sản phẩm:
  - Cung cấp ảnh rõ ràng, bao gồm mặt trước và mặt sau của sản phẩm.
  - Hình ảnh cần chi tiết, sắc nét, thể hiện rõ các đặc điểm sản phẩm.
  Chi tiết sản phẩm:
  - Cung cấp hình ảnh hoặc mô tả chi tiết về đường may, chất liệu, và các đặc trưng nổi bật.
  - Thêm hình ảnh tag quần áo (nếu có).
  Mô tả sản phẩm:
  - Viết ghi chú đầy đủ và chính xác, bao gồm các thông tin như kích thước, màu sắc, tình trạng mới/cũ, và các khuyết điểm (nếu có).
  Xuất xứ:
  - Ghi rõ nguồn gốc sản phẩm (nếu biết).
  Yêu cầu:
  - Người đăng phải có đủ số lượng kim cương theo quy định để thực hiện việc đăng sản phẩm.
2. Trao đổi
Chính sách trao đổi hàng hóa được áp dụng với các quy định sau:
  Điều kiện trao đổi:
  - Người tham gia phải có sản phẩm cụ thể và phù hợp để thực hiện trao đổi.
  Minh chứng giao dịch:
  - Trong quá trình trao đổi, cả hai bên cần ghi nhận các bước giao dịch, bao gồm ảnh chụp, video hoặc tài liệu chứng minh.
  Trạng thái giao dịch:
  - Luôn cập nhật trạng thái trao đổi trên hệ thống để đảm bảo rõ ràng và minh bạch.
3. Quyên góp
Chính sách quyên góp dành cho các sản phẩm được cung cấp với mục đích thiện nguyện:
  Hình ảnh sản phẩm:
  - Cung cấp ảnh rõ ràng, bao gồm mặt trước và mặt sau của sản phẩm.
  - Hình ảnh phải thể hiện đầy đủ chi tiết của sản phẩm.
  Chi tiết sản phẩm:
  - Mô tả rõ ràng các đường may, chất liệu, và các đặc điểm nổi bật của sản phẩm.
  - Hình ảnh tag quần áo là tùy chọn, không bắt buộc.
  Mô tả sản phẩm:
  - Viết ghi chú chi tiết, bao gồm thông tin về kích thước, tình trạng, và mục đích quyên góp.
  Xuất xứ:
  - Ghi rõ nguồn gốc sản phẩm (nếu có thông tin).
  Yêu cầu:
  - Người đăng phải có đủ số lượng kim cương theo quy định để thực hiện việc quyên góp.`}</p>
      </div>
    </Modal>
  )
}
