import { navLink } from '@/types/navTypes'
export const TypeCategory: navLink[] = [
  {
    href: '/shop',
    label: 'Tất cả sản phẩm',
  },
  {
    href: '/shop?filterTypeCategory=female',
    label: 'Đồ nữ',
  },
  {
    href: '/shop?filterTypeCategory=male',
    label: 'Đồ nam',
  },
  {
    href: '/shop?filterTypeCategory=unisex',
    label: 'Unisex',
  },
  {
    href: '/shop?filterTypeCategory=item',
    label: 'Phụ kiện',
  },
  {
    href: '/shop?filterTypeCategory=other',
    label: 'Khác',
  },
]
