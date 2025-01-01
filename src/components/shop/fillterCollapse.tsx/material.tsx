import { materialData } from '@/metadata/materialData'
import { Checkbox } from 'antd'

export default function FillterMaterial({
  handleFilterChange,
  isFilterChecked,
}: {
  handleFilterChange: (checked: boolean, filterType: string, value: string) => void
  isFilterChecked: (filterType: string, value: string) => boolean
}) {
  return (
    <div
      style={{
        maxHeight: '500px',
        overflowY: 'auto',
      }}
    >
      <div className="flex flex-col gap-2 ">
        {materialData.map((material) => (
          <Checkbox
            key={material.id}
            className="my-2 filter_checkbox"
            style={{
              color: '#000',
              fontSize: '1.3rem',
            }}
            onChange={(e) => handleFilterChange(e.target.checked, 'filterMaterial', material.value)}
            checked={isFilterChecked('filterMaterial', material.value)}
          >
            {material.name}
          </Checkbox>
        ))}
      </div>
    </div>
  )
}
