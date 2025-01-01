import { TypeCategory } from '@/metadata/category'
import FormStyleUser from '@/components/homepage/FormStyle'
import { Metadata } from 'next'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Loading from './loading'
import { fetchConfig, fetchProducts, fetchTotalEcoOfAllUser } from '@/action/homepage'
import { fetchBrand } from '@/action/brand'
import { fetchCategories } from '@/action/category'

// Chuyển sang dùng React.lazy
const HomePageHero = dynamic(() => import('@/components/homepage/HomepageHero'), {
  ssr: false,
  loading: () => <Loading />,
})
const HomePageFavorate = dynamic(() => import('@/components/homepage/HomePageFavorite'), {
  ssr: false,
  loading: () => <Loading />,
})
const HomePageSamePrice = dynamic(() => import('@/components/homepage/HomePageSamePrice'), {
  ssr: false,
  loading: () => <Loading />,
})
const HomePageCategory = dynamic(() => import('@/components/homepage/HomePageCategory'), {
  ssr: false,
  loading: () => <Loading />,
})
const HomePageTogetherSection = dynamic(() => import('@/components/homepage/HomePageTogetherSection'), {
  ssr: false,
  loading: () => <Loading />,
})
const HomePageManFashion = dynamic(() => import('@/components/homepage/HomePageMaleFashion'), {
  ssr: false,
  loading: () => <Loading />,
})
const HomePageFemale = dynamic(() => import('@/components/homepage/HomePageFemale'), {
  ssr: false,
  loading: () => <Loading />,
})
const HomePageUnisex = dynamic(() => import('@/components/homepage/HomePageUnisex'), {
  ssr: false,
  loading: () => <Loading />,
})
const HomePageYouLike = dynamic(() => import('@/components/homepage/HomePageYouLike'), {
  ssr: false,
  loading: () => <Loading />,
})
const Navigation = dynamic(() => import('@/components/nav'), {
  ssr: false,
  loading: () => <Loading />,
})
const HomePageTitle = dynamic(() => import('@/components/homepage/HomepageTitle'), {
  ssr: false,
  loading: () => <Loading />,
})

export const metadata: Metadata = {
  title: 'Share2Receive - Nền tảng trao đổi đồ dùng thời trang, giúp tủ đồ gọn gàng',
  description:
    'Share2Receive - Nền tảng trao đổi đồ dùng thời trang, giúp tủ đồ gọn gàng - Nền tảng trao đổi đồ dùng thời trang, giúp tủ đồ gọn gàng ',
  keywords: [
    'trao đổi đồ',
    'thời trang bền vững',
    'second hand',
    'tủ đồ thông minh',
    'share2receive',
    'Share2Receive, trao đổi đồ dùng thời trang, tủ đồ gọn gàng',
  ],
  robots: 'index, follow',
  authors: [{ name: 'Share2Receive', url: 'https://share2receive-client.vercel.app' }],
  creator: 'Share2Receive',
  publisher: 'Share2Receive',
  metadataBase: new URL('https://share2receive-client.vercel.app'),
  alternates: {
    canonical: 'https://share2receive-client.vercel.app',
  },
  openGraph: {
    title: 'Share2Receive - Nền tảng trao đổi đồ dùng thời trang, giúp tủ đồ gọn gàng',
    description: 'Share2Receive - Nền tảng trao đổi đồ dùng thời trang, giúp tủ đồ gọn gàng',
    url: 'https://share2receive-client.vercel.app',
    siteName: 'Share2Receive',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    title: 'Share2Receive - Nền tảng trao đổi đồ dùng thời trang, giúp tủ đồ gọn gàng',
    description: 'Share2Receive - Nền tảng trao đổi đồ dùng thời trang, giúp tủ đồ gọn gàng',
  },
}

export default async function Home() {
  const productsMale = await fetchProducts('male')
  const productsFemale = await fetchProducts('female')
  const brands = await fetchBrand()
  const categories = await fetchCategories()
  const configs = await fetchConfig()
  const totalWeight = await fetchTotalEcoOfAllUser()

  return (
    <>
      <Suspense fallback={<Loading />}>
        <FormStyleUser />
        <Navigation navLink={TypeCategory} />
        <div className="mt-[105px] md:mt-0">
          <HomePageHero config={configs} />
          <HomePageTitle />
          <HomePageYouLike />
          <HomePageManFashion config={configs} products={productsMale.data} />
          <HomePageFemale donus={productsFemale.data} />
          <HomePageUnisex config={configs} />
          <HomePageFavorate brands={brands} config={configs} />
          <HomePageSamePrice />
          <div className="container mx-auto px-2 md:px-32 text-center text-lg md:text-2xl font-medium text-green-800 uppercase mt-8">
            <h1>
              <span className="font-bold">Share2Receive </span>
              &#45; Nền tảng trao đổi đồ dùng thời trang, giúp tủ đồ gọn gàng
            </h1>
          </div>
          <HomePageCategory categories={categories} totalWeight={totalWeight.totalWeight} />
          <HomePageTogetherSection />
        </div>
      </Suspense>
    </>
  )
}
