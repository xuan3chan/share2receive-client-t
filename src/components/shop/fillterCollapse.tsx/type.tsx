import { Checkbox } from 'antd'

export default function FillterType({
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
        onChange={(e) => handleFilterChange(e.target.checked, 'filterType', 'barter')}
        checked={isFilterChecked('filterType', 'barter')}
        style={{
          color: '#000',
          fontSize: '1.3rem',
        }}
      >
        Sản phẩm trao đổi
      </Checkbox>
      <Checkbox
        onChange={(e) => handleFilterChange(e.target.checked, 'filterType', 'sale')}
        checked={isFilterChecked('filterType', 'sale')}
        className="my-2 filter_checkbox"
        style={{
          color: '#000',
          fontSize: '1.3rem',
        }}
      >
        Sản phẩm bán
      </Checkbox>
    </div>
  )
}
