import { TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

export default function MiddleSection({
  searchKey,
  setSearchKey,
  handleSearchSubmit,
}: {
  searchKey: string
  setSearchKey: (value: string) => void
  handleSearchSubmit: (event: any) => void
}) {
  return (
    <>
      <div className="flex-1 mx-4 mt-2 md:mt-0 md:mx-2 w-full md:w-auto">
        <form onSubmit={handleSearchSubmit}>
          <TextInput
            value={searchKey}
            onChange={(event) => setSearchKey(event.currentTarget.value)}
            placeholder="Tìm kiếm..."
            rightSection={<IconSearch size={16} />}
            size="md"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSearchSubmit(event)
              }
            }}
            styles={(theme) => ({
              input: {
                borderColor: theme.colors.green[7], // Dark green border
                '&:focus': {
                  borderColor: theme.colors.green[7], // Border color on focus
                },
              },
            })}
          />
        </form>
      </div>
    </>
  )
}
