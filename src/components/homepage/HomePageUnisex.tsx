import { ConfigType } from '@/types/config'
import Link from 'next/link'

const HomePageUnisex = ({ config }: { config: ConfigType }) => {
  return (
    <>
      <div className="relative mt-5 md:mt-10">
        <div className="text-center flex justify-center">
          <div className="flex w-full md:w-1/2 items-center rounded-full">
            <div className="flex-1 border-b border-gray-300"></div>
            <Link href="shop?filterTypeCategory=female">
              <div className="group relative w-max text-black text-lg font-bold leading-6 m-3 md:m-6 md:text-2xl px-2 py-1 md:px-8 md:py-3 uppercase">
                <h1 className="flex items-center gap-2">Thời trang Unisex</h1>
                <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
                <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
              </div>
            </Link>
            <div className="flex-1 border-b border-gray-300"></div>
          </div>
        </div>
        <div className=" relative w-full h-full md:pt-6">
          <Link href="shop?filterTypeCategory=unisex">
            <div
              className="w-full min-h-[405px] md:h-[680px] bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${config.sectionUrl_2})`,
              }}
            ></div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default HomePageUnisex
