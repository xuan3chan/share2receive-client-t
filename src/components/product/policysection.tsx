import { useProductClient } from '@/zustand/productClient'
import IconifyIcon from '../icons'

export default function PolicySection() {
  const { toggleCodeModal, toggleRefundModal, toggleBuyModal } = useProductClient()

  return (
    <>
      <div className="container mx-auto p-5 bg-green-100 rounded-lg flex flex-col gap-3">
        <div className="flex flex-row items-start gap-3 md:gap-5 cursor-pointer" onClick={toggleBuyModal}>
          <IconifyIcon icon="hugeicons:truck" />
          <div className="flex flex-col max-w-[90%]">
            <p className="title text-base font-semibold">Chính sách trao đổi mua bán</p>
            <p className="desc text-xs ">Chính sách mua bán, trao đổi, quyên góp, tìm hiểu thêm</p>
          </div>
        </div>
        <div className="flex flex-row items-start gap-3 md:gap-5 cursor-pointer" onClick={toggleCodeModal}>
          <IconifyIcon icon="solar:box-line-duotone" />
          <div className="flex flex-col max-w-[90%]">
            <p className="title text-base font-semibold">Các quy tắc</p>
            <p className="desc text-xs ">Chính sách về COD, tìm hiểu thêm</p>
          </div>
        </div>
        <div className="flex flex-row items-start gap-3 md:gap-5 cursor-pointer" onClick={toggleRefundModal}>
          <IconifyIcon icon="hugeicons:truck-return" />
          <div className="flex flex-col max-w-[90%]">
            <p className="title text-base font-semibold">Chính sách hoàn tiền</p>
            <p className="desc text-xs ">Chính sách về hoàn trả tiền, tìm hiểu thêm</p>
          </div>
        </div>
      </div>
    </>
  )
}
