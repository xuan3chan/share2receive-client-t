import Loading from '@/app/loading'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const ProductManagement = dynamic(() => import('@/components/product-management/productManagement'), {
  ssr: false,
  loading: () => <Loading />,
})

export const metadata: Metadata = {
  title: 'Quản lý sản phẩm',
  description: 'Quản lý sản phẩm',
}

const ProductManagementPage = () => {
  return <ProductManagement />
}

export default ProductManagementPage
