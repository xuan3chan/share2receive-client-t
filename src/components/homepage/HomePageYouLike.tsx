'use client'
import { Carousel } from '@mantine/carousel'
import useSWR from 'swr'
import productService from '@/services/product/product.service'
import { useProductClient } from '@/zustand/productClient'
import Image from 'next/image'
import { useRef } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import { Card } from 'antd'
import { formatPrice } from '@/helper/format'
import { useMediaQuery } from '@mantine/hooks'
import dynamic from 'next/dynamic'

const IconifyIcon = dynamic(() => import('@/components/icons'))

const HomePageYouLike = () => {
  const { productsPropose, setProductsPropose } = useProductClient()
  const { Meta } = Card
  const isDesktop = useMediaQuery('(min-width: 62em)')

  const { isLoading } = useSWR('product/propose', productService.getProductUserWillLike, {
    onSuccess: (data) => {
      setProductsPropose(data?.data?.data)
    },
  })

  const autoplay = useRef(Autoplay({ delay: 2000 }))

  console.log(productsPropose)

  if (!productsPropose || productsPropose.length === 0) {
    return <></>
  }

  return (
    <>
      <div className="container mx-auto px-2 pt-3 md:px-24 md:pt-10">
        <div className="text-center flex justify-center">
          <div className="flex w-full mb-3 md:mb-0 md:w-1/2 items-center rounded-full">
            <div className="flex-1 border-b border-gray-300"></div>
            <div className="group relative w-max text-black text-lg font-bold leading-6 m-3 md:m-6 md:text-2xl md:leading-3 px-2 py-1 md:px-8 md:py-3 uppercase">
              <h1 className="flex items-center gap-2">
                Các sản phẩm bạn có thể thích <IconifyIcon icon="twemoji:fire" className="w-4 md:w-8" />
              </h1>
              <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
              <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
            </div>
            <div className="flex-1 border-b border-gray-300"></div>
          </div>
        </div>
        <div className="">
          <div className="relative z-[2] h-full overflow-hidden">
            <div className="container px-2 overflow-hidden">
              <Carousel
                withIndicators={false}
                withControls={isDesktop ? true : false}
                height={isDesktop ? 510 : 430}
                translate="yes"
                slideGap={isDesktop ? 'sm' : 'xs'}
                slideSize={isDesktop ? '25%' : '50%'}
                loop
                align="start"
                plugins={[autoplay.current]}
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={autoplay.current.reset}
              >
                {productsPropose.map((product) => {
                  return (
                    <>
                      <Carousel.Slide key={product._id}>
                        <Link href={`/shop/${product.slug}`} key={product._id} prefetch={true}>
                          <Card
                            key={product._id}
                            hoverable={true}
                            loading={isLoading}
                            className="shadow-sm"
                            size="default"
                            style={{
                              width: isDesktop ? '265px' : '200px',
                              border: '2px solid #f0f0f0',
                              height: '100%',
                            }}
                            styles={{
                              body: {
                                padding: '10px',
                                marginTop: '10px',
                              },
                            }}
                            cover={
                              <div
                                style={{
                                  width: '100%', // Fixed width for the image container
                                  height: isDesktop ? '330px' : '260px', // Fixed height for the image container
                                  overflow: 'hidden', // Ensures the image fits the container without overflow
                                  position: 'relative',
                                }}
                              >
                                {product.type === 'barter' && (
                                  <div className="absolute top-0 left-0 bg-green-800 text-white px-2 py-1">
                                    Trao đổi
                                  </div>
                                )}
                                {product.condition === 'new' && (
                                  <div className="absolute top-0 right-0 text-white bg-red-500 px-2 py-1">Mới</div>
                                )}
                                <Image
                                  src={product.imgUrls?.[0]}
                                  alt={product.productName}
                                  width={400}
                                  height={300}
                                  loading="lazy"
                                  className="object-cover w-full h-full"
                                  priority={false}
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  quality={70}
                                />
                              </div>
                            }
                          >
                            <div className="flex flex-col gap-2">
                              <Meta title={<p className="text-lg md:text-xl">{product.productName}</p>} />
                              <Meta
                                title={
                                  <p className="text-sm md:text-lg font-normal">
                                    Kích thước:{' '}
                                    {Array.from(new Set(product.sizeVariants.map((variant) => variant.size)))
                                      .slice(0, 3)
                                      .map((size, index) => (
                                        <span key={index}>
                                          {size}
                                          {index < product.sizeVariants.slice(0, 3).length - 1 && ', '}
                                        </span>
                                      ))}
                                    {product.sizeVariants.length > 3 && ',...'}
                                  </p>
                                }
                              />
                              <Meta
                                title={
                                  <p className="text-lg md:text-xl font-semibold text-green-800">
                                    {product.type === 'barter' ? (
                                      <>
                                        <p>Liên hệ</p>
                                        <p className="text-xs md:text-sm underline">Xem ngay</p>
                                      </>
                                    ) : (
                                      <>
                                        <p>{formatPrice(product.price) + 'đ'}</p>
                                        <p className="text-xs md:text-sm underline">Xem ngay</p>
                                      </>
                                    )}
                                  </p>
                                }
                              />
                            </div>
                          </Card>
                        </Link>
                      </Carousel.Slide>
                    </>
                  )
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePageYouLike
