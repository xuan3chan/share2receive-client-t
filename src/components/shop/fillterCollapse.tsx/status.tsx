import { Checkbox } from 'antd'

export default function FillterStatus({
  handleFilterChange,
  isFilterChecked,
}: {
  handleFilterChange: any
  isFilterChecked: any
}) {
  return (
    <div className="flex flex-col gap-2">
      <Checkbox
        className="my-2 filter_checkbox"
        onChange={(e) => handleFilterChange(e.target.checked, 'filterCondition', 'used')}
        checked={isFilterChecked('filterCondition', 'used')}
        style={{
          color: '#000',
          fontSize: '1.3rem',
        }}
      >
        Sản phẩm đã qua sử dụng
      </Checkbox>
      <Checkbox
        className="my-2 filter_checkbox"
        onChange={(e) => handleFilterChange(e.target.checked, 'filterCondition', 'new')}
        checked={isFilterChecked('filterCondition', 'new')}
        style={{
          color: '#000',
          fontSize: '1.3rem',
        }}
      >
        Sản phẩm mới 100%
      </Checkbox>
    </div>
  )
}
