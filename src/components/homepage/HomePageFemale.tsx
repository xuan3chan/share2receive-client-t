'use client'

import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'
import Link from 'next/link'
import style from '@/styles/card.module.css'
import { ProductsClient } from '@/types/users/productTypes'
import { useMediaQuery } from '@mantine/hooks'
import dynamic from 'next/dynamic'

const ProductCard = dynamic(() => import('../shop/productCard'), { ssr: false, loading: () => <div>Loading...</div> })
const IconifyIcon = dynamic(() => import('../icons'), { ssr: false, loading: () => <div>Loading...</div> })

const HomePageFemale = ({ donus }: { donus: ProductsClient[] }) => {
  const isDesktop = useMediaQuery('(min-width: 62em)')
  const autoplay = useRef(Autoplay({ delay: 2000 }))

  return (
    <>
      <div className="relative mt-3 md:mt-10">
        <div className="text-center flex justify-center">
          <div className="flex w-full md:w-1/2 items-center rounded-full">
            <div className="flex-1 border-b border-gray-300"></div>
            <Link href="shop?filterTypeCategory=female">
              <div className="group relative w-max text-black text-lg font-bold leading-6 m-3 md:m-6 md:text-2xl md:leading-3 px-2 py-1 md:px-8 md:py-3 uppercase">
                <h1 className="flex items-center gap-2">
                  Thời trang dành cho nữ <IconifyIcon icon="ic:twotone-female" width={30} />
                </h1>
                <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
                <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
              </div>
            </Link>
            <div className="flex-1 border-b border-gray-300"></div>
          </div>
        </div>
        <div className="relative overflow-hidden w-full h-full container px-2 md:px-24 mx-auto">
          <div className="flex justify-between items-center w-full h-full md:pt-6 overflow-hidden">
            <div className={`banner_tab w-[24.3%] h-full overflow-hidden hidden md:block`}>
              <Link href="/shop?filterTypeCategory=female" className={style.card} title="Đồ nữ">
                <div
                  className=" h-full min-h-[500px] bg-cover bg-no-repeat rounded-md"
                  style={{
                    backgroundImage: 'url(/images/do_nu.png)',
                    backgroundPosition: 'center 0px',
                  }}
                ></div>
              </Link>
            </div>
            <div className="relative z-[2] md:ml-5 w-full md:w-[75%] h-full overflow-hidden">
              <div className="container overflow-hidden">
                <Carousel
                  withIndicators={false}
                  height={isDesktop ? 510 : 430}
                  translate="yes"
                  slideGap={{
                    base: 'xs',
                  }}
                  slideSize={{ base: '50%', sm: '33.33%', md: '27%' }}
                  loop
                  align="start"
                  plugins={donus?.length > 4 ? [autoplay.current] : []}
                  onMouseEnter={donus?.length > 4 ? autoplay.current.stop : undefined}
                  onMouseLeave={donus?.length > 4 ? autoplay.current.reset : undefined}
                >
                  {donus?.map((item) => (
                    <>
                      <Carousel.Slide>
                        <ProductCard product={item} isLoading={false} />
                      </Carousel.Slide>
                    </>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePageFemale
