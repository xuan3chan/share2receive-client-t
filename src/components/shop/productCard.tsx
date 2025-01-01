import { Card } from 'antd'
import Image from 'next/image'
import { formatPrice } from '@/helper/format'
import { ProductsClient } from '@/types/users/productTypes'
import Link from 'next/link'
import { useMediaQuery } from '@mantine/hooks'

export default function ProductCard({ product, isLoading }: { product: ProductsClient; isLoading?: boolean }) {
  const { Meta } = Card
  const isDesktop = useMediaQuery('(min-width: 62em)')

  return (
    <div className="w-full h-full relative">
      <Link
        href={`/shop/${product.slug}`}
        key={product._id}
        prefetch={true}
        className="absolute top-0 left-0 right-0 bottom-0"
      >
        <Card
          key={product._id}
          hoverable={true}
          loading={isLoading}
          className="shadow-sm"
          size="default"
          style={{
            width: '100%', // Allow card to take the full width of its container
            border: '2px solid #f0f0f0',
            height: '100%',
            overflow: 'hidden',
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
                width: 'auto',
                height: isDesktop ? '330px' : '260px', // Fixed height for the image container
                overflow: 'hidden', // Ensures the image fits the container without overflow
                position: 'relative',
              }}
            >
              {product.type === 'donate' && (
                <div className="absolute top-0 left-0 bg-blue-800 text-white px-2 py-1">Quyên góp</div>
              )}
              {product.type === 'barter' && (
                <div className="absolute top-0 left-0 bg-green-800 text-white px-2 py-1">Trao đổi</div>
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
                quality={60}
              />
            </div>
          }
        >
          <div className="flex flex-col gap-2 w-full">
            <Meta title={<span className="text-lg md:text-xl">{product.productName}</span>} />
            <Meta
              title={
                <span className="text-sm md:text-lg font-normal">
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
                </span>
              }
            />
            <Meta
              title={
                <span className="text-lg md:text-xl font-semibold text-green-800">
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
                </span>
              }
            />
          </div>
          <Meta
            style={{
              marginTop: isDesktop ? '10px' : '20px',
            }}
            title={
              <div className="flex">
                <div className="w-5 h-5 overflow-hidden rounded-full mr-2">
                  <Image
                    src={product.userId?.avatar}
                    alt={product.userId?.firstname + ' ' + product.userId?.lastname}
                    width={20}
                    height={20}
                    className="object-cover w-full h-full"
                    priority={false}
                    sizes="40px"
                    quality={20}
                  />
                </div>
                <div className="flex justify-center items-center">
                  <span className="text-xs md:text-sm font-semibold">
                    {product.userId?.firstname + ' ' + product.userId?.lastname}
                  </span>
                </div>
              </div>
            }
          />
        </Card>
      </Link>
    </div>
  )
}
