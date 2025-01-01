/* eslint-disable @next/next/no-img-element */
'use client'

import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'
import dynamic from 'next/dynamic'
import IconifyIcon from '../icons'
import { Brand } from '@/types/clientypes'
import { ConfigType } from '@/types/config'

const BrandSlider = dynamic(() => import('@/components/slider/brandSilder'), { ssr: false })

const priorityOrder = {
  veryHigh: 4,
  high: 3,
  medium: 2,
  low: 1,
}

export default function HomePageFavorate({ brands, config }: { brands: Brand[]; config: ConfigType }) {
  const autoplay2 = useRef(Autoplay({ delay: 2000 }))

  const sortedBrands = brands?.sort((a, b) => {
    return (
      priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder]
    )
  })

  return (
    <>
      <div className="mt-6 md:mt-12 wrapper">
        <div className="fashion-brand">
          <p className="text-lg md:text-2xl font-bold text-center mb-5 uppercase">
            Thương hiệu bạn <span className="text-orange-600">yêu thích</span>
          </p>
          <div className="fashion-subtext container mx-auto px-2 md:px-16 flex flex-row flex-wrap w-full justify-center my-6">
            <div className="subtext_content w-1/2 md:w-1/3 flex items-center justify-center text-green-700 font-semibold text-sm md:text-lg md:mb-0">
              <IconifyIcon icon="ri:refresh-line" className="text-sm mr-1 md:mr-2 md:text-3xl" />
              <p>Cập nhật mỗi ngày</p>
            </div>
            <div className="subtext_content w-1/2 md:w-1/3 flex items-center justify-center text-green-700 font-semibold text-sm md:text-lg md:mb-0">
              <IconifyIcon icon="tabler:diamond" className="text-sm mr-1 md:mr-2 md:text-3xl" />
              <p>Hàng trăm thương hiệu</p>
            </div>
            <div className="subtext_content w-1/2 md:w-1/3 flex items-center justify-center text-green-700 font-semibold text-sm md:text-lg">
              <IconifyIcon icon="tabler:tag" className="text-sm mr-1 md:mr-2 md:text-3xl" />
              <p>Giá cả hấp dẫn</p>
            </div>
          </div>
        </div>
        <section className="relative w-full h-[320px] md:h-[400px] bg-transparent">
          <div className="wrapper z-30 absolute top-0 w-full h-full bg-transparent pointer-events:none ">
            <div className="w-full relative left-0 top-0  opacity-100 before:absolute before:top-0 before:left-0 h-full bg-transparent overflow-hidden">
              <div className="relative h-full bg-transparent">
                <div className="absolute w-full h-full block bg-transparent overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full overflow-hidden flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <div className="absolute w-screen h-screen -top-[25%] -bottom-[10%]">
                        <div className="responsive-iframe-brand">
                          <iframe
                            src={`https://www.youtube.com/embed/${config.videoUrl_2}?playlist=${config.videoUrl_2}&loop=1&autoplay=1&mute=1&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1&start=10&end=70`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share; loop;"
                            referrerPolicy="strict-origin-when-cross-origin"
                            loading="lazy"
                            title="brand"
                            width="100%"
                            height="100%"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0">
            <BrandSlider sortedBrands={sortedBrands} autoplay2={autoplay2} />
          </div>
        </section>
      </div>
    </>
  )
}
