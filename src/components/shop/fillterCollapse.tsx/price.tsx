import { Checkbox } from 'antd'

export default function FillterPrice({
  handlePriceRangeChange,
  isPriceRangeChecked,
}: {
  handlePriceRangeChange: (checked: boolean, startPrice: number, endPrice: number) => void
  isPriceRangeChecked: (startPrice: number, endPrice: number) => boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <Checkbox
        onChange={(e) => handlePriceRangeChange(e.target.checked, 0, 100000)}
        checked={isPriceRangeChecked(0, 100000)}
        className="my-2 filter_checkbox"
        style={{
          color: '#000',
          fontSize: '1.3rem',
        }}
      >
        Dưới 100k
      </Checkbox>

      <Checkbox
        onChange={(e) => handlePriceRangeChange(e.target.checked, 100000, 200000)}
        checked={isPriceRangeChecked(100000, 200000)}
        className="my-2 filter_checkbox"
        style={{
          color: '#000',
          fontSize: '1.3rem',
        }}
      >
        100k - 200k
      </Checkbox>

      <Checkbox
        onChange={(e) => handlePriceRangeChange(e.target.checked, 200000, 500000)}
        checked={isPriceRangeChecked(200000, 500000)}
        className="my-2 filter_checkbox"
        style={{
          color: '#000',
          fontSize: '1.3rem',
        }}
      >
        200k - 500k
      </Checkbox>

      <Checkbox
        onChange={(e) => handlePriceRangeChange(e.target.checked, 500000, 1000000)}
        checked={isPriceRangeChecked(500000, 1000000)}
        className="my-2 filter_checkbox"
        style={{
          color: '#000',
          fontSize: '1.3rem',
        }}
      >
        500k - 1tr
      </Checkbox>

      <Checkbox
        onChange={(e) => handlePriceRangeChange(e.target.checked, 1000000, 50000000)}
        checked={isPriceRangeChecked(1000000, 50000000)}
        className="my-2 filter_checkbox"
        style={{
          color: '#000',
          fontSize: '1.3rem',
        }}
      >
        Trên 1tr
      </Checkbox>
    </div>
  )
}
