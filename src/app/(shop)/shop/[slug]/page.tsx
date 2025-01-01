import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Loading from '@/app/loading'
import { fetchAllProdClient, fetchProductBySlug } from '@/action/shop'

const Breadcrumb = dynamic(() => import('@/components/Breadcrumb'), { ssr: false, loading: () => <div /> })
const CodModal = dynamic(() => import('@/components/product/codModal'), { ssr: false, loading: () => <div /> })
const RefundModal = dynamic(() => import('@/components/product/refundModal'), { ssr: false, loading: () => <div /> })
const BuyModal = dynamic(() => import('@/components/product/buyModal'), { ssr: false, loading: () => <div /> })
const ProductDetail = dynamic(() => import('@/components/product/productDetail'), {
  ssr: false,
  loading: () => <div />,
})

export async function generateStaticParams() {
  const products = await fetchAllProdClient(1, 999)

  if (!products) {
    return []
  }

  return products.data.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await fetchProductBySlug(params.slug)

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    }
  }

  return {
    title: product.productName,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await fetchProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const breadcrumbItems = [
    { label: 'Trang chủ', link: '/' },
    { label: 'Cửa hàng', link: '/shop' },
    { label: product.productName, link: `/shop/${product.productName}` },
  ]

  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto mt-40 px-2 md:px-0 md:mt-36">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <CodModal />
      <RefundModal />
      <BuyModal />
      <ProductDetail product={product} />
    </Suspense>
  )
}
