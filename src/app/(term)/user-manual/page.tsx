import Image from 'next/image'

export default function UserManual() {
  return (
    <div className="flex flex-1 flex-col items-start justify-center gap-5 container">
      <h1 className="text-2xl font-semibold">Hướng dẫn sử dụng</h1>
      <p className="text-lg font-semibold">
        Lưu ý : Các anh chị vui lòng dùng trình duyệt Google Chrome hoặc Safari trên điện thoại để truy cập và đăng ký
        tham gia cùng REshare.
      </p>
      <p className="text-lg font-semibold">1. Cho tặng quần áo</p>
      <p className="text-lg">
        <span className="font-semibold">Bước 1: </span>
        Đăng nhập vào REshare sử dụng email hoặc Google
      </p>
      <div className="w-[900px]">
        <Image
          src="/images/z6166129352059_1d0c79b56f2ecfe7a822ddd7c3be6809.jpg"
          alt="Step 1"
          width={1200}
          height={812}
          loading="lazy"
          quality={100}
          className="w-full h-full"
        />
      </div>
      <p className="text-lg">
        <span className="font-semibold">Bước 2: </span>
        Đăng sản phẩm và chọn loại sản phẩm là &quot;Cho tặng&quot;
      </p>
      <div className="w-[900px]">
        <Image
          src="/images/z6166129352059_1d0c79b56f2ecfe7a822ddd7c3be6809.jpg"
          alt="Step 1"
          width={1200}
          height={812}
          loading="lazy"
          quality={100}
          className="w-full h-full"
        />
      </div>
    </div>
  )
}
