import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export default function QuantitySelection({
  count,
  setCount,
  maxQuantity,
  totalQuantity,
}: {
  count: number
  setCount: (count: number) => void
  maxQuantity: number
  totalQuantity: number
}) {
  return (
    <>
      <div className="flex flex-row justify-start items-center">
        <p className="text-md md:text-lg">Số lượng: </p>
        <div className="flex flex-row items-center ml-2 gap-2">
          <Button
            icon={<MinusOutlined style={{ fontSize: '16px', color: '#000' }} />}
            onClick={() => setCount(count - 1)}
            disabled={count === 1}
          />
          <p className="text-lg bg-white px-4 py-1 md:px-6 md:py-2 rounded-xl text-center">{count}</p>
          <Button
            icon={<PlusOutlined style={{ fontSize: '16px', color: '#000' }} />}
            onClick={() => setCount(count + 1)}
            disabled={count >= maxQuantity}
          />
        </div>
        <p className="hidden md:block ml-4 text-sm text-gray-600">Còn lại: {totalQuantity} sản phẩm</p>
      </div>
      <p className="md:hidden text-sm text-gray-600">Còn lại: {totalQuantity} sản phẩm</p>
    </>
  )
}
