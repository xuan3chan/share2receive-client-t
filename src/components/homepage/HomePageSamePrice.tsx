'use client'
import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import homepage from '@/styles/homepage.module.css'
import { useRef, useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import productService from '@/services/product/product.service'
import { ProductsClient } from '@/types/users/productTypes'
import dynamic from 'next/dynamic'

const ProductCard = dynamic(() => import('../shop/productCard'), { ssr: false, loading: () => <div>Loading...</div> })

export default function HomePageSamePrice() {
  const autoplay3 = useRef(Autoplay({ delay: 5000 }))
  const [samePrice, setSamePrice] = useState<ProductsClient[]>([])

  useSWR(
    'samePriceFashion',
    () =>
      productService.getAllProdClient(
        1,
        10,
        ['670a21cad47ec9342aedcdac'],
        undefined,
        19000,
        19000,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ),
    {
      onSuccess(data) {
        setSamePrice(data?.data)
      },
    },
  )
  if (samePrice.length === 0) return null
  return (
    <>
      <div className="container mx-auto px-2 mt-5 md:px-24 md:mt-10">
        <div className="discount mb-5 md:mb-10">
          <Link href="/shop?filterCategory=670a21cad47ec9342aedcdac">
            <p className="text-lg md:text-2xl font-bold text-center mb-2 uppercase">
              Các sản phẩm <span className="text-orange-600">Đầm</span>
            </p>
          </Link>
        </div>
        <div className="flex md:block">
          <div className="flex items-center md:hidden w-1/2 bg-[#f4e9cb] rounded-l-sm">
            <Link href="/shop?filterCategory=670a21cad47ec9342aedcdac&filterStartPrice=1&filterEndPrice=19000">
              <h2 className="font-semibold text-lg text-center">
                Đồng giá <span className="text-green-500">19k</span> Các loại sản phẩm đầm
              </h2>
              <p className="text-center text-sm">&#40;Xem ngay để nhận ưu đãi lớn nhất từ Share2Receive &#41;</p>
            </Link>
          </div>
          <div className="discount-content relative w-1/2 md:w-full h-[250px] md:h-[500px] bg-cover md:bg-contain rounded-r-sm md:rounded-md flex justify-between bg-[#ecd5ea] bg-[url('/images/category-brand-bg.png')] bg-no-repeat bg-[100%_100%]">
            <div className="Carousel-discount w-[70%] py-4 pl-4 h-full hidden md:block">
              <Carousel
                slideSize="33.33%"
                align="start"
                loop
                slideGap="md"
                slidesToScroll={1}
                withControls={false}
                plugins={[autoplay3.current]}
                onMouseEnter={autoplay3.current.stop}
                onMouseLeave={autoplay3.current.reset}
                className="h-full"
                classNames={{
                  container: homepage.container,
                  viewport: homepage.viewport,
                }}
              >
                {samePrice.map((item) => (
                  <Carousel.Slide key={item._id} className="min-h-full">
                    <ProductCard product={item} isLoading={false} />
                  </Carousel.Slide>
                ))}
              </Carousel>
            </div>
            <div className="mt-4 mr-5 hidden md:block">
              <Link href="/shop?filterCategory=670a21cad47ec9342aedcdact" className="text-end">
                <h2 className="font-bold text-3xl">
                  Đồng giá <span className="text-green-500">19k</span> Các loại sản phẩm đầm
                </h2>
                <p>&#40;Xem ngay để nhận ưu đãi lớn nhất từ Share2Receive &#41;</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
