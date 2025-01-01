'use client'

import { useState, useEffect, useRef } from 'react'
import { useMediaQuery } from '@mantine/hooks'
import { Category } from '@/types/clientypes'
import dayjs from 'dayjs'
import CountUp from 'react-countup'
import Image from 'next/image'
import Link from 'next/link'

const priorityOrder = {
  veryHigh: 4,
  high: 3,
  medium: 2,
  low: 1,
}

export default function HomePageCategory({ categories, totalWeight }: { categories: Category[]; totalWeight: number }) {
  const isDesktop = useMediaQuery('(min-width: 62em)')
  const [isCounting, setIsCounting] = useState(false)
  const categoryRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCounting(true)
        }
      },
      {
        threshold: 0.5, // Chỉ kích hoạt khi 50% phần tử xuất hiện trong viewport
      },
    )

    if (categoryRef.current) {
      observer.observe(categoryRef.current)
    }

    return () => {
      if (categoryRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(categoryRef.current)
      }
    }
  }, [])

  const sortedCategories = categories?.sort((a, b) => {
    return (
      priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder]
    )
  })

  const getDay = dayjs().format('DD/MM/YYYY')

  return (
    <>
      <div className="category-section mt-5 md:mt-8 bg-green-100 w-full h-full" ref={categoryRef}>
        <div className="container mx-auto px-2 py-4 md:px-24 md:py-10">
          <div className="text-center">
            <h1 className="text-xl md:text-3xl font-semibold">Hàng trăm sản phẩm các loại</h1>
            <p className="text-xs md:text-base font-medium mt-1 md:mt-3">
              Được kiểm duyệt kỹ càng sẵn sàng đến tay bạn!
            </p>
          </div>
          <div className="text-end py-4 px-1 md:p-0 mt-2">
            <Link
              href={`/shop`}
              className="text-xs py-4 px-1 md:p-0 md:text-lg font-bold text-green-900 underline tracking-tighter"
            >
              Xem tất cả
            </Link>
          </div>
          <div className="category-list flex justify-center flex-row flex-wrap gap-3">
            {sortedCategories?.slice(0, 8)?.map((item) => (
              <Link href={`/shop?filterCategory=${item._id}`} key={item._id} className="w-[43%] md:w-[24%]">
                <div className="category-item relative bg-white rounded-md shadow-md flex items-center justify-around overflow-hidden">
                  <div className="w-[60px] md:w-[100px] h-[80px] md:h-[100px] max-w-[100px] max-h-[100px] relative">
                    <Image
                      src={item.imgUrl}
                      alt={item.name}
                      loading="lazy"
                      width={100}
                      height={100}
                      quality={60}
                      style={{
                        objectFit: 'contain',
                        objectPosition: 'center',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-xs md:text-lg">{item.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div
          className="statictis-item flex flex-row h-[300px] md:h-[390px] w-full bg-[url('/images/crystal-ball-on-moss-in-green-forest-environment-2023-11-27-05-05-51-utc.jpg')] bg-cover bg-no-repeat 
          md:bg-center overflow-hidden"
          style={{
            backgroundPositionY: isDesktop ? '-120px' : '0px',
            backgroundPositionX: isDesktop ? '0px' : '-240px',
          }}
        >
          <div className="overlay-statistic relative w-[67%] md:w-[38%] ml-5 md:ml-72 my-14 md:my-20">
            <div className="absolute backdrop-blur-sm text-white top-0 left-0 right-0 bottom-0 rounded-md p-5">
              <div className="content-title text-3xl md:text-5xl font-semibold uppercase mb-1">
                <h1>Giảm thiểu</h1>
              </div>
              {isCounting && (
                <p className="mb-1 text-3xl md:text-5xl font-bold text-green-900 bg-white w-fit px-3 py-2 rounded-sm">
                  <CountUp end={totalWeight} duration={2} decimal="." /> <span>Kilogram</span>
                </p>
              )}
              <p className="mb-1 text-lg md:text-2xl font-semibold">
                Rác thải thời trang, <span className="text-white text-lg md:text-2xl">tính đến ngày {getDay}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
