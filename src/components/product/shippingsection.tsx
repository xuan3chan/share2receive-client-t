import IconifyIcon from '../icons'

export default function ShippingSection() {
  return (
    <>
      <div className="container mx-auto p-5 bg-green-100 rounded-lg flex flex-col gap-3">
        <div className="flex flex-row items-start gap-3 md:gap-5">
          <IconifyIcon icon="hugeicons:truck" />
          <div className="flex flex-col max-w-[90%]">
            <p className="title text-base font-semibold">Chi phí vận chuyển ?</p>
            <p className="desc text-xs ">
              Chi phí vận chuyển sẽ được tính theo cước phí bên phía dịch vụ giao hàng liên kết với Share2Receive
            </p>
          </div>
        </div>
        <div className="flex flex-row items-start gap-3 md:gap-5">
          <IconifyIcon icon="solar:box-line-duotone" />
          <div className="flex flex-col max-w-[90%]">
            <p className="title text-base font-semibold">Quy tắc COD ?</p>
            <p className="desc text-xs ">Chính sách về COD, tìm hiểu thêm</p>
          </div>
        </div>
        <div className="flex flex-row items-start gap-3 md:gap-5">
          <IconifyIcon icon="hugeicons:truck-return" />
          <div className="flex flex-col max-w-[90%]">
            <p className="title text-base font-semibold">Chính sách hoàn trả ?</p>
            <p className="desc text-xs ">Chính sách về hoàn trả hàng, tìm hiểu thêm</p>
          </div>
        </div>
      </div>
    </>
  )
}
