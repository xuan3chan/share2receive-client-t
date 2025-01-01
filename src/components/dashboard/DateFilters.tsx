'use client'
import { Select } from '@mantine/core'
import { DateInput, DatesProvider, MonthPickerInput, YearPickerInput } from '@mantine/dates'
import { memo } from 'react'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'

const DateFilters = memo(
  ({
    value,
    setValue,
    dateFromValue,
    setDateFromValue,
    dateToValue,
    setDateToValue,
    startDate,
    endDate,
    viewBy,
  }: {
    value: any
    setValue: any
    dateFromValue: any
    setDateFromValue: any
    dateToValue: any
    setDateToValue: any
    startDate: any
    endDate: any
    viewBy: any
  }) => {
    const router = useRouter()

    return (
      <div className="w-[800px] flex flex-row gap-2">
        <Select
          data={[
            {
              value: '',
              label: 'Chọn thời gian',
              disabled: true,
            },
            { value: 'day', label: 'Theo ngày' },
            { value: 'month', label: 'Theo tháng' },
            { value: 'year', label: 'Theo năm' },
          ]}
          placeholder="Chọn thời gian"
          label="Chọn thời gian"
          value={value ? value.value : null}
          clearable
          onChange={(selected) => {
            const selectedValue = selected ? { value: selected, label: selected } : null
            setValue(selectedValue)
            setDateFromValue(null)
            setDateToValue(null)
            // Use selected value directly in URL
            router.push(`/dashboard?viewBy=${selected || ''}`, { scroll: false })
          }}
        />
        <DatesProvider settings={{ locale: 'vi' }}>
          {viewBy === 'day' && (
            <>
              <DateInput
                valueFormat="YYYY-MM-DD"
                label="Từ ngày"
                placeholder="Chọn ngày bắt đầu"
                value={dateFromValue}
                onChange={(date) => {
                  setDateFromValue(date)
                  const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : ''
                  const query = new URLSearchParams({
                    startDate: formattedDate,
                    endDate: endDate,
                    viewBy: viewBy,
                  }).toString()
                  router.push(`/dashboard?${query}`, { scroll: false })
                }}
                clearable
              />
              <DateInput
                valueFormat="YYYY-MM-DD"
                label="Đến ngày"
                placeholder="Chọn ngày kết thúc"
                value={dateToValue}
                onChange={(date) => {
                  setDateToValue(date)
                  const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : ''
                  const query = new URLSearchParams({
                    startDate: startDate,
                    endDate: formattedDate,
                    viewBy: viewBy,
                  }).toString()
                  router.push(`/dashboard?${query}`, { scroll: false })
                }}
                disabled={!dateFromValue}
                clearable
                minDate={dateFromValue || undefined}
              />
            </>
          )}
          {viewBy === 'month' && (
            <>
              <MonthPickerInput
                label="Chọn tháng"
                placeholder="Chọn tháng bắt đầu"
                valueFormat="YYYY-MM"
                value={dateFromValue}
                onChange={(date) => {
                  setDateFromValue(date)
                  const formattedDate = date ? dayjs(date).format('YYYY-MM') : ''
                  const query = new URLSearchParams({
                    startDate: formattedDate,
                    endDate: endDate,
                    viewBy: viewBy,
                  }).toString()
                  router.push(`/dashboard?${query}`, { scroll: false })
                }}
                clearable
              />
              <MonthPickerInput
                label="Chọn tháng"
                placeholder="Chọn tháng kết thúc"
                valueFormat="YYYY-MM"
                value={dateToValue}
                onChange={(date) => {
                  setDateToValue(date)
                  const formattedDate = date ? dayjs(date).format('YYYY-MM') : ''
                  const query = new URLSearchParams({
                    startDate: startDate,
                    endDate: formattedDate,
                    viewBy: viewBy,
                  }).toString()
                  router.push(`/dashboard?${query}`, { scroll: false })
                }}
                clearable
              />
            </>
          )}
          {viewBy === 'year' && (
            <>
              <YearPickerInput
                label="Chọn năm bắt đầu"
                placeholder="Chọn năm bắt đầu"
                valueFormat="YYYY"
                value={dateFromValue}
                onChange={(date) => {
                  setDateFromValue(date)
                  const formattedDate = date ? dayjs(date).format('YYYY') : ''
                  const query = new URLSearchParams({
                    startDate: formattedDate,
                    endDate: endDate,
                    viewBy: viewBy,
                  }).toString()
                  router.push(`/dashboard?${query}`, { scroll: false })
                }}
                clearable
              />
              <YearPickerInput
                label="Chọn năm kết thúc"
                placeholder="Chọn năm kết thúc"
                valueFormat="YYYY"
                value={dateToValue}
                onChange={(date) => {
                  setDateToValue(date)
                  const formattedDate = date ? dayjs(date).format('YYYY') : ''
                  const query = new URLSearchParams({
                    startDate: startDate,
                    endDate: formattedDate,
                    viewBy: viewBy,
                  }).toString()
                  router.push(`/dashboard?${query}`, { scroll: false })
                }}
                clearable
              />
            </>
          )}
        </DatesProvider>
      </div>
    )
  },
)

DateFilters.displayName = 'DateFilters'

export default DateFilters
