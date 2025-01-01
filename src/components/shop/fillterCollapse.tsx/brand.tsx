import { Brand } from '@/types/clientypes'
import { Checkbox } from 'antd'

export default function FillterBrand({
  brands,
  handleFilterChange,
  isFilterChecked,
}: {
  brands: Brand[] | null
  handleFilterChange: any
  isFilterChecked: any
}) {
  return (
    <div className="flex flex-col gap-2">
      {brands?.map((brand) => (
        <Checkbox
          onChange={(e) => handleFilterChange(e.target.checked, 'filterBrand', brand._id)}
          checked={isFilterChecked('filterBrand', brand._id)}
          key={brand._id}
          className="my-2 filter_checkbox"
          style={{
            color: '#000',
            fontSize: '1.3rem',
          }}
        >
          {brand.name + ` (${brand.totalProduct || 0})`}
        </Checkbox>
      ))}
    </div>
  )
}
