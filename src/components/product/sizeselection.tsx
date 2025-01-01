export default function SizeSelection({
  uniqueSizes,
  selectedSize,
  handleSizeToggle,
  validSizes,
}: {
  uniqueSizes: string[]
  selectedSize: string
  handleSizeToggle: (size: string) => void
  validSizes: string[]
}) {
  return (
    <>
      <div className="flex flex-row items-center">
        <p className="text-md md:text-lg">Kích cỡ: </p>
        <div className="flex flex-row ml-2">
          {uniqueSizes.map((size) => (
            <div key={size} className="w-full h-full mr-2">
              <input
                type="checkbox"
                id={`size-${size}`}
                name="size"
                value={size}
                className="hidden peer"
                onChange={() => handleSizeToggle(size)}
                checked={selectedSize === size}
                disabled={!validSizes.includes(size)}
              />
              <label
                htmlFor={`size-${size}`}
                className={`inline-flex items-center justify-between w-full bg-white border-2 rounded-lg cursor-pointer peer-checked:border-green-500 peer-checked:border-2 ${
                  validSizes.includes(size)
                    ? 'border-gray-200 hover:bg-gray-50'
                    : 'opacity-50 cursor-not-allowed border-gray-300'
                }`}
              >
                <div className="text-md md:text-lg font-semibold p-3 md:p-5 flex justify-center items-center min-w-5 min-h-5 max-w-fit max-h-5">
                  {size}
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
