import Image from 'next/image'

export default function HomePageTogetherSection() {
  return (
    <>
      <div
        className="together-section relative mt-10 mb-10 md:mb-20 w-full h-[250px] bg-contain bg-[center_96px] bg-no-repeat "
        style={{
          backgroundImage: 'url("/images/choose-price-bg.png")',
        }}
      >
        <div className="container mx-auto h-full w-full md:w-[1000px]">
          <div className="together_title text-lg md:text-2xl font-bold text-green-900 uppercase text-center ">
            <h1>
              Hãy cùng Share
              <span
                style={{
                  color: 'salmon',
                }}
              >
                2
              </span>
              Receive
            </h1>
          </div>
          <div className="together_desc text-xs md:text-md font-medium md:font-bold text-center mt-1 md:mt-2 mb-8 md:mb-10 px-5 md:px-0">
            Tuần hoàn và kéo dài vòng đời của các sản phẩm thời trang đã qua sử dụng.
          </div>
          <div className="card-container flex justify-evenly items-start">
            <div className="together-card flex flex-col justify-center items-center w-[25%] md:w-[15%] text-center">
              <div className="card-img flex items-center justify-center p-3 bg-white rounded-md shadow-[0px_0px_10px_0px_#68d391] mb-3  max-w-32 w-28 h-20 md:h-full md:w-full max-h-56">
                <Image
                  width={155}
                  height={155}
                  src="/images/packet.png"
                  alt="packet"
                  loading="lazy"
                  quality={70}
                  className="md:w-auto w-12 md:h-24"
                />
              </div>
              <p className="together-card-desc font-medium text-[10px] md:text-sm ">Trao đổi sản phẩm</p>
            </div>
            <div className="together-card flex flex-col justify-center items-center w-[25%] md:w-[14%] text-center">
              <div className="card-img flex items-center justify-center p-3 bg-white rounded-md shadow-[0px_0px_10px_0px_#68d391] mb-3  max-w-32 w-28 h-20 md:h-full md:w-full max-h-56">
                <Image
                  width={155}
                  height={155}
                  src="/images/shirt.svg"
                  alt="shirt"
                  quality={70}
                  loading="lazy"
                  className="md:w-auto w-12 md:h-24"
                />
              </div>
              <p className="together-card-desc font-medium text-[10px] md:text-sm ">Giữ gìn giá trị thời trang</p>
            </div>
            <div className="together-card flex flex-col justify-center items-center w-[25%] md:w-[14%] text-center">
              <div className="card-img flex items-center justify-center p-3 bg-white rounded-md shadow-[0px_0px_10px_0px_#68d391] mb-3  max-w-32 w-28 h-20 md:h-full md:w-full max-h-56">
                <Image
                  width={155}
                  height={155}
                  src="/images/replace.png"
                  alt="replace"
                  quality={70}
                  loading="lazy"
                  className="md:w-auto w-12 md:h-24"
                />
              </div>
              <p className="together-card-desc font-medium text-[10px] md:text-sm ">Bảo vệ môi trường</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
