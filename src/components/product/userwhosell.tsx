'use client'

import { ProductsClient } from '@/types/users/productTypes'
import Image from 'next/image'
import IconifyIcon from '../icons'
import useRatingStore from '@/zustand/rating'

export default function UserWhosell({ product }: { product: ProductsClient }) {
  const { toggleRatingModal, setUserId } = useRatingStore()

  return (
    <>
      <div className="flex flex-row justify-start items-center">
        <p className="text-sm md:text-lg">Người bán: </p>
        <div className="flex flex-row items-center ml-2">
          <div className="w-6 h-6 md:w-10 md:h-10 overflow-hidden rounded-full mr-1 md:mr-2">
            <Image
              src={product.userId.avatar}
              alt={product.userId.firstname + ' ' + product.userId.lastname}
              width={50}
              height={50}
              quality={50}
              className="object-cover"
            />
          </div>
          <p className=" text-sm md:text-lg font-semibold">
            {product.userId.firstname + ' ' + product.userId.lastname}
          </p>
        </div>
      </div>
      {product?.userId?.averageRating !== null && (
        <div className="flex flex-row items-center md:gap-1">
          <p className="text-sm md:text-lg">Đánh giá của người bán: </p>
          {product?.userId?.averageRating > 0 && (
            <>
              <p className="text-sm md:text-lg ml-2">{product?.userId?.averageRating?.toFixed(2)} / 5 </p>
              <IconifyIcon icon="fluent-emoji-flat:star" className="md:w-6 md:h-6 w-4 h-4" />
            </>
          )}
          {product?.userId?.numberOfRating > 0 ? (
            <>
              <p className="text-sm md:text-lg ml-2">({product?.userId?.numberOfRating} đánh giá)</p>
              <p
                className="text-sm md:text-lg hover:underline cursor-pointer"
                onClick={() => {
                  toggleRatingModal()
                  setUserId(product.userId._id)
                }}
              >
                Xem thêm
              </p>
            </>
          ) : (
            <p className="text-sm md:text-lg ml-2">Chưa có đánh giá</p>
          )}
        </div>
      )}
    </>
  )
}
