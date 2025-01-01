import IconifyIcon from '@/components/icons'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-slate-100">
      <div className="container mx-auto px-4 md:px-16 py-8 md:py-12">
        <div className="flex flex-wrap gap-8 md:gap-12">
          {/* Logo and Contact Info */}
          <div className="w-full md:w-1/4">
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
              Share
              <span
                style={{
                  color: 'salmon',
                }}
              >
                2
              </span>
              Receive
            </h1>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <IconifyIcon className="text-xl md:text-2xl mt-1" icon="mingcute:location-line" />
                <span className="text-sm md:text-base">15 Đường số 6, phường 15, quận Gò Vấp, Tp.HCM</span>
              </div>

              <div className="flex items-start gap-3">
                <IconifyIcon className="text-xl md:text-2xl mt-1" icon="ic:outline-mail" />
                <span className="text-sm md:text-base">share2recieve.support@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="w-full md:w-2/3 flex flex-wrap justify-between gap-8">
            {/* Customer Support */}
            <div className="w-full sm:w-auto">
              <h3 className="text-base md:text-lg font-semibold mb-4">Hỗ trợ khách hàng</h3>
              <ul className="space-y-3 text-sm md:text-base">
                <li>Hướng dẫn mua hàng</li>
                <li>Hình thức thanh toán</li>
                <li>
                  <Link href={'/purchase-donation-conditions'}>Điều kiện cho tặng</Link>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div className="w-full sm:w-auto">
              <h3 className="text-base md:text-lg font-semibold mb-4">Chính sách</h3>
              <ul className="space-y-3 text-sm md:text-base">
                <li>
                  <Link href="/about">Về chúng tôi</Link>
                </li>
                <li>
                  <Link href={`/terms-condition`}>Điều khoản</Link>
                </li>
                <li>
                  <Link href={'/purchase-donation-conditions'}>Chính sách bảo mật</Link>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="w-full sm:w-auto">
              <h3 className="text-base md:text-lg font-semibold mb-4">Kết nối với chúng tôi</h3>
              <div className="flex gap-4">
                <Image src="/images/facebook-footer.png" alt="facebook" width={35} height={35} loading="lazy" />
                <Image src="/images/instagram-footer.png" alt="instagram" width={35} height={35} loading="lazy" />
                <Image src="/images/tiktok-footer.png" alt="tiktok" width={35} height={35} loading="lazy" />
                <Image src="/images/youtube-footer.png" alt="youtube" width={35} height={35} loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
