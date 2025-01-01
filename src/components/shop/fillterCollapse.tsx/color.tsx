import { colorData } from '@/metadata/colorData'
import { Checkbox } from 'antd'

export default function FillterColor({
  handleFilterChange,
  isFilterChecked,
}: {
  handleFilterChange: (checked: boolean, filterName: string, value: string) => void
  isFilterChecked: (filterName: string, value: string) => boolean
}) {
  return (
    <div className="filter_color checkbox-material gap-1">
      {colorData.map((color) => (
        <Checkbox
          key={color.value}
          value={color.value}
          onChange={(e) => handleFilterChange(e.target.checked, 'filterColor', color.value)}
          checked={isFilterChecked('filterColor', color.value)}
          className="card-checkbox"
        >
          <div className="card-content flex items-center flex-col justify-start w-full h-full">
            <div
              className="color-bg shadow-sm color rounded-full"
              style={{
                backgroundColor: `${color.color}CC`,
                width: '1.7rem',
                height: '1.7rem',
              }}
            ></div>
            <div className="w-full text-center">
              <p className="text-black color-name text-lg">{color.name}</p>
            </div>
          </div>
        </Checkbox>
      ))}
    </div>
  )
}
