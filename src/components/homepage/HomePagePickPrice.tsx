'use client'
import homepage from '@/styles/homepage.module.css'
import Link from 'next/link'

export default function HomePagePickPrice() {
  return (
    <>
      <div
        className="choose-price_section relative mt-14 w-full h-[250px] bg-contain bg-[center_96px] bg-no-repeat "
        style={{
          backgroundImage: 'url("/images/choose-price-bg.png")',
        }}
      >
        <div>
          <div className="text-center flex justify-center">
            <div className="flex w-[50%] items-center rounded-full">
              <div className="flex-1 border-b border-gray-300"></div>
              <h2 className="m-6 group relative w-max text-black text-2xl font-bold leading-3 px-8 py-3 uppercase">
                Chọn mức giá mua sắm
                <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
                <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
              </h2>
              <div className="flex-1 border-b border-gray-300"></div>
            </div>
          </div>
          <div className="price_section-price container mx-auto px-44 flex flex-row justify-around mt-3">
            <div className={homepage.price_content}>
              <Link
                href="/shop?filterStartPrice=0&filterEndPrice=19000"
                className="flex flex-col items-center"
              >
                <span className="text-lg h-fit">Dưới</span>
                <span className="text-[44px] font-bold">19k</span>
              </Link>
            </div>
            <div className={homepage.price_content}>
              <Link
                href="/shop?filterStartPrice=0&filterEndPrice=39000"
                className="flex flex-col items-center"
              >
                <span className="text-lg h-fit">Dưới</span>
                <span className="text-[44px] font-bold">39k</span>
              </Link>
            </div>
            <div className={homepage.price_content}>
              <Link
                href="/shop?filterStartPrice=0&filterEndPrice=69000"
                className="flex flex-col items-center"
              >
                <span className="text-lg h-fit">Dưới</span>
                <span className="text-[44px] font-bold">69k</span>
              </Link>
            </div>
            <div className={homepage.price_content}>
              <Link
                href="/shop?filterStartPrice=0&filterEndPrice=100000"
                className="flex flex-col items-center"
              >
                <span className="text-lg h-fit">Dưới</span>
                <span className="text-[44px] font-bold">99k</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
