import { ProductsClient } from '@/types/users/productTypes'
import { Collapse } from 'antd'
import IconifyIcon from '../icons'

export default function InforProduct({
  product,
  getMaterialName,
  getConditionName,
  getStyleName,
}: {
  product: ProductsClient
  getMaterialName: (material: string) => string
  getConditionName: (condition: string) => string
  getStyleName: (style: string) => string
}) {
  return (
    <>
      <div className="rounded-lg p-2 md:p-5 w-full md:w-1/2">
        <Collapse
          accordion
          expandIconPosition="right"
          bordered={false}
          ghost
          items={[
            {
              key: '1',
              label: <p className="text-base md:text-lg font-semibold border-b-2">Thông tin sản phẩm</p>,
              children: (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row gap-7 items-start ">
                    <p className="w-[140px] md:w-[170px] flex text-sm md:text-lg font-semibold">Mô tả: </p>
                    <p className="w-full text-sm md:text-lg capitalize whitespace-pre-line">{product.description}</p>
                  </div>
                  <div className="flex flex-row gap-7 items-center ">
                    <p className="w-[140px] md:w-[170px] flex text-sm md:text-lg font-semibold">Chất liệu: </p>
                    <p className="w-full text-sm md:text-lg capitalize">{getMaterialName(product.material)}</p>
                  </div>
                  <div className="flex flex-row gap-7 items-center ">
                    <p className="w-[140px] md:w-[170px] flex text-sm md:text-lg font-semibold">Tình trạng: </p>
                    <p className="w-full text-sm md:text-lg capitalize">{getConditionName(product.condition)}</p>
                  </div>
                  <div className="flex flex-row gap-7 items-center ">
                    <p className="w-[140px] md:w-[170px] flex text-sm md:text-lg font-semibold">Khối lượng: </p>
                    <p className="w-full text-sm md:text-lg capitalize">{product.weight}g</p>
                  </div>
                  <div className="flex flex-row gap-7 items-center ">
                    <p className="w-[140px] md:w-[170px] flex text-sm md:text-lg font-semibold">Phong cách: </p>
                    <p className="w-full text-sm md:text-lg capitalize">{getStyleName(product.style)}</p>
                  </div>
                </div>
              ),
              showArrow: false,
              extra: <IconifyIcon icon="carbon:information" />,
              style: {
                backgroundColor: '#fff',
                padding: '0px',
              },
            },
          ]}
        />
      </div>
    </>
  )
}
