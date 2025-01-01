import { fetchAllProdClient } from '@/action/shop'
import Loading from '@/app/loading'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

interface SearchParams {
  page?: number
  limit?: number
  filterCategory?: string[]
  filterBrand?: string[]
  filterStartPrice?: number
  filterEndPrice?: number
  filterSize?: string[]
  filterColor?: string[]
  filterMaterial?: string[]
  filterCondition?: string[]
  filterType?: string[]
  filterStyle?: string[]
  filterTypeCategory?: string[]
  searchKey?: string
}

const Shop = dynamic(() => import('@/components/shop/shop'), { ssr: false, loading: () => <div /> })
const Breadcrumb = dynamic(() => import('@/components/Breadcrumb'), { ssr: false, loading: () => <div /> })

export const metadata: Metadata = {
  title: 'Cửa hàng',
  description: 'Cửa hàng của chúng tôi cung cấp các sản phẩm chất lượng, giá cả phải chăng',
}

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const breadcrumbItems = [
    { label: 'Trang chủ', link: '/' },
    { label: 'Cửa hàng', link: '/shop' },
  ]

  const productData = await fetchAllProdClient(
    searchParams.page ? Number(searchParams.page) : 1,
    searchParams.limit ? Number(searchParams.limit) : 50,
    searchParams.filterCategory ? searchParams.filterCategory?.toString().split(',') : undefined,
    searchParams.filterBrand ? searchParams.filterBrand.toString().split(',') : undefined,
    searchParams.filterStartPrice ? Number(searchParams.filterStartPrice) : undefined,
    searchParams.filterEndPrice ? Number(searchParams.filterEndPrice) : undefined,
    searchParams.filterSize ? searchParams.filterSize.toString().split(',') : undefined,
    searchParams.filterColor ? searchParams.filterColor.toString().split(',') : undefined,
    searchParams.filterMaterial ? searchParams.filterMaterial.toString().split(',') : undefined,
    searchParams.filterCondition ? searchParams.filterCondition.toString().split(',') : undefined,
    searchParams.filterType ? searchParams.filterType.toString().split(',') : undefined,
    searchParams.filterStyle ? searchParams.filterStyle.toString().split(',') : undefined,
    searchParams.filterTypeCategory ? searchParams.filterTypeCategory.toString().split(',') : undefined,
    searchParams.searchKey ?? '',
  )

  const total = productData.total

  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto mt-40 px-2 md:px-0 md:mt-36">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <Shop products={productData.data} total={total} />
    </Suspense>
  )
}
