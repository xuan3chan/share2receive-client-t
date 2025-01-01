import { sizes } from '@/metadata/sizeData'
import { Checkbox } from 'antd'

export default function FilterSize({
  handleFilterChange,
  isFilterChecked,
}: {
  handleFilterChange: (checked: boolean, filterName: string, value: string) => void
  isFilterChecked: (filterName: string, value: string) => boolean
}) {
  return (
    <div className="flex flex-col">
      <div className="filter_checkbox checkbox-material display-flex flex-wrap gap-2">
        {sizes.map((size) => (
          <Checkbox
            key={size.id}
            value={size.value}
            className="card-checkbox"
            onChange={(e) => handleFilterChange(e.target.checked, 'filterSize', size.value)}
            checked={isFilterChecked('filterSize', size.value)}
            style={{
              color: '#000',
              fontSize: '1.3rem',
            }}
          >
            <div className="">
              <div className="w-full">
                <p className="text-black uppercase text-color">{size.name}</p>
              </div>
            </div>
          </Checkbox>
        ))}
      </div>
    </div>
  )
}
