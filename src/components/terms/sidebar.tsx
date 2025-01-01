'use client'
import MenuItem from './menuItem'
import { usePathname } from 'next/navigation'

export default function SideBar() {
  const pathNames = usePathname()

  return (
    <div className="flex flex-1 flex-col items-start justify-center gap-10 container">
      <h1 className="text-2xl font-semibold">Các chính sách của Share2Receive</h1>
      <div className="flex flex-col w-full mt-4">
        <MenuItem href="/terms-condition" label="Điều khoản" icon="solar:book-broken" pathname={pathNames} />
        <MenuItem
          href="/privacy-policy"
          label="Chính sách bảo mật"
          icon="solar:shield-user-broken"
          pathname={pathNames}
        />
        <MenuItem
          href="/purchase-donation-conditions"
          label="Điều khoản cho tặng"
          icon="solar:bag-4-broken"
          pathname={pathNames}
        />
        <MenuItem href="/user-manual" label="Hướng dẫn sử dụng" icon="solar:book-2-broken" pathname={pathNames} />
      </div>
    </div>
  )
}
