'use client'
import { Checkbox } from 'antd'

export default function FillterCategory({ categories, handleFilterChange, isFilterChecked }: any) {
  return (
    <div
      style={{
        maxHeight: '500px',
        overflowY: 'auto',
      }}
    >
      <div className="flex flex-col gap-2">
        {categories?.map((cate: any) => (
          <Checkbox
            key={cate._id}
            className="my-2 filter_checkbox"
            style={{
              color: '#000',
              fontSize: '1.3rem',
            }}
            onChange={(e) => handleFilterChange(e.target.checked, 'filterCategory', cate._id)}
            checked={isFilterChecked('filterCategory', cate._id)}
          >
            {cate.name + ` (${cate.totalProduct || 0})`}
          </Checkbox>
        ))}
      </div>
    </div>
  )
}
