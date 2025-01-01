'use client'

import { formatPrice } from '@/helper/format'
import { useGetName } from '@/helper/getName'
import { type CartItem } from '@/types/cart'
import { Tooltip, UnstyledButton, NumberInput } from '@mantine/core'
import Image from 'next/image'
import IconifyIcon from '../icons'
import { useState } from 'react'

export default function CartItem({
  item,
  handleDeleteCartItem,
}: {
  item: CartItem
  handleDeleteCartItem: (id: string) => void
}) {
  const { getColorName } = useGetName()
  const [amount, setAmount] = useState<number>(item.amount)

  const handleChangeAmount = (value: number) => {
    setAmount(value)
  }

  return (
    <div className="cart_item flex flex-col md:flex-row gap-4 p-4 border rounded-lg shadow-md">
      {/* Image */}
      <div className="cart-item_image flex-shrink-0 w-[120px] h-[160px] relative rounded-md overflow-hidden">
        <Image
          src={item.productId.imgUrls[0]}
          alt={item.productId.productName}
          width={120}
          height={160}
          quality={70}
          loading="lazy"
          className="object-cover absolute top-0 left-0 w-full h-full"
        />
      </div>

      {/* Info */}
      <div className="cart-item_info flex flex-col flex-grow gap-2 max-w-[400px]">
        {/* Product Name */}
        <h3 className="text-gray-800 text-lg font-semibold truncate max-h-[60px]">{item.productId.productName}</h3>

        {/* Price */}
        <p className="text-gray-700 text-base font-medium">{formatPrice(item.total)}đ</p>

        {/* Details */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-medium">
          <p>Kích thước: {item.size}</p>
          <p>Màu sắc: {getColorName(item.color)}</p>
        </div>

        {/* Quantity Control */}
        <div className="flex items-center gap-4">
          <p className="text-gray-700">Số lượng:</p>
          <NumberInput
            value={amount}
            onChange={(value) => handleChangeAmount(Number(value))}
            min={1}
            max={99}
            step={1}
            size="sm"
            styles={{
              input: { width: 60, textAlign: 'center' },
            }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="cart-item_action flex flex-col items-center justify-between">
        <Tooltip label="Xóa sản phẩm" position="right" withArrow>
          <UnstyledButton onClick={() => handleDeleteCartItem(item._id)}>
            <IconifyIcon icon="mdi:trash-can-outline" className="text-red-600 w-6 h-6 hover:text-red-800" />
          </UnstyledButton>
        </Tooltip>
      </div>
    </div>
  )
}
