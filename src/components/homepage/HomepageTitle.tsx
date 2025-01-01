import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'vietnamese'],
  preload: true,
  display: 'swap',
})

const HomePageTitle = () => {
  return (
    <>
      <div className="container mx-auto px-2 pt-3 md:px-24 md:pt-14 grid gap-10">
        <h1
          style={{
            fontFamily: spaceGrotesk.style.fontFamily,
            fontSmooth: 'auto',
            textTransform: 'uppercase',
            textAlign: 'center',
            letterSpacing: '.9px',
            fontWeight: 500,
          }}
          className="text-green-800 text-sm leading-6 md:text-2xl md:leading-10"
        >
          “Tại Share2Receive, chúng tôi tin rằng mỗi sản phẩm trao đổi không chỉ mang đến niềm vui mới mà còn góp phần
          giữ gìn hành tinh. Hãy cùng nhau xây dựng một thế giới bền vững hơn qua từng lựa chọn nhỏ.” - Xuân Nguyễn,
          Founder
        </h1>
      </div>
    </>
  )
}

export default HomePageTitle
