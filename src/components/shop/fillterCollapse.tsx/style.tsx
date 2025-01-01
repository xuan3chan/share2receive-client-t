import { clothingStylesData } from '@/metadata/styleData'
import { Checkbox } from 'antd'

export default function FillterStyle({
  handleFilterChange,
  isFilterChecked,
}: {
  handleFilterChange: any
  isFilterChecked: any
}) {
  return (
    <div
      style={{
        maxHeight: '500px',
        overflowY: 'auto',
      }}
    >
      <Checkbox.Group className="display-flex flex-col gap-3">
        {clothingStylesData.map((style) => (
          <Checkbox
            onChange={(e) => handleFilterChange(e.target.checked, 'filterStyle', style.value)}
            checked={isFilterChecked('filterStyle', style.value)}
            key={style.id}
            className="my-2 filter_checkbox"
            style={{
              color: '#000',
              fontSize: '1.3rem',
            }}
            value={style.value}
          >
            {style.name}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  )
}
