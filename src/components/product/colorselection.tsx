export default function ColorSelection({
  uniqueColors,
  selectedColor,
  handleColorToggle,
  validColors,
}: {
  uniqueColors: string[]
  selectedColor: string
  handleColorToggle: (color: string) => void
  validColors: string[]
}) {
  return (
    <>
      <div className="flex flex-row items-center">
        <p className="text-md md:text-lg">Màu sắc: </p>
        <div className="flex flex-row ml-2">
          {uniqueColors.map((color) => (
            <div key={color} className="w-fit h-fit mr-2">
              <input
                type="checkbox"
                id={`color-${color}`}
                name="color"
                value={color}
                className="hidden peer"
                onChange={() => handleColorToggle(color)}
                checked={selectedColor === color}
                disabled={!validColors.includes(color)}
              />
              <label
                htmlFor={`color-${color}`}
                className={`inline-flex items-center justify-between w-full text-gray-500 bg-white border-2 rounded-lg cursor-pointer peer-checked:border-green-500 peer-checked:border-2 ${
                  validColors.includes(color)
                    ? 'border-gray-200 hover:bg-gray-50'
                    : 'opacity-50 cursor-not-allowed border-gray-300'
                }`}
              >
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2" style={{ backgroundColor: color }}></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
