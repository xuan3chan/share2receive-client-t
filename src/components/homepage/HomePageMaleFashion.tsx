'use client'
import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import { useRef } from 'react'
import { ProductsClient } from '@/types/users/productTypes'
import { useMediaQuery } from '@mantine/hooks'
import dynamic from 'next/dynamic'
import { ConfigType } from '@/types/config'

const IconifyIcon = dynamic(() => import('@/components/icons'), { ssr: false })
const ProductCard = dynamic(() => import('@/components/shop/productCard'), { ssr: false, loading: () => <div /> })

const HomePageManFashion = ({ products, config }: { products: ProductsClient[]; config: ConfigType }) => {
  const autoplay = useRef(Autoplay({ delay: 2000 }))
  const isDesktop = useMediaQuery('(min-width: 62em)')

  const shouldAutoplay = products?.length > 4

  return (
    <div className="relative container mx-auto pt-3 md:px-24 md:pt-10">
      <div className="text-center flex justify-center">
        <div className="flex w-full md:w-1/2 items-center rounded-full">
          <div className="flex-1 border-b border-gray-300"></div>
          <Link href="shop?filterTypeCategory=male">
            <div className="group relative w-max text-black text-lg font-bold leading-6 m-3 md:m-6 md:text-2xl md:leading-3 px-2 py-1 md:px-8 md:py-3 uppercase">
              <h1 className="flex items-center gap-2">
                Thời trang dành cho nam <IconifyIcon icon="ic:twotone-male" className="w-4 md:w-8" />
              </h1>
              <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
              <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
            </div>{' '}
          </Link>
          <div className="flex-1 border-b border-gray-300"></div>
        </div>
      </div>
      <div
        className="overflow-hidden relative mx-auto w-full h-full min-h-[150px] md:min-h-[500px] bg-cover bg-no-repeat md:rounded-md flex justify-between md:mt-6"
        style={{
          backgroundImage: `url(${config.sectionUrl_1})`,
          backgroundPosition: 'center 0px',
        }}
      >
        <div className="container mx-auto px-2">
          <div className="slider py-2 md:py-4">
            <div className="flex w-full h-full">
              <div className="w-full md:w-[65%]">
                <div className="slider">
                  <Carousel
                    withIndicators={false}
                    withControls={isDesktop ? (products.length > 3 ? true : false) : false}
                    height={isDesktop ? 510 : 430}
                    translate="yes"
                    slideGap={{
                      base: 'xs',
                    }}
                    slideSize={isDesktop ? '33.33%' : '50%'}
                    loop={shouldAutoplay ? true : false}
                    align="start"
                    plugins={shouldAutoplay ? [autoplay.current] : []}
                    onMouseEnter={shouldAutoplay ? autoplay.current.stop : undefined}
                    onMouseLeave={shouldAutoplay ? autoplay.current.reset : undefined}
                  >
                    {products.map((item) => (
                      <>
                        <Carousel.Slide>
                          <ProductCard product={item} isLoading={false} />
                        </Carousel.Slide>
                      </>
                    ))}
                  </Carousel>
                </div>
              </div>
              <div className="w-[40%] hidden md:block"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePageManFashion
