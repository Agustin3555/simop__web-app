import { HTMLInputTypeAttribute, useCallback, useMemo } from 'react'
import { Updater } from '@tanstack/react-table'
import { DebouncedInput } from '..'
import { TypeMeta } from '../../../../LocalQuery'

interface DateRangeFilterProps {
  type: TypeMeta
  columnFilterValue: { min?: string; max?: string }
  setFilterValue: (updater: Updater<any>) => void
}

const DateRangeFilter = ({
  type,
  columnFilterValue = {},
  setFilterValue,
}: DateRangeFilterProps) => {
  const inputType = useMemo(() => {
    const matcher: Partial<Record<TypeMeta, HTMLInputTypeAttribute>> = {
      date: 'date',
      dateTime: 'datetime-local',
    }

    return matcher[type]
  }, [type])

  const inputs = [
    { title: 'Desde', key: 'min', value: columnFilterValue.min },
    { title: 'Hasta', key: 'max', value: columnFilterValue.max },
  ]

  const handleChange = useCallback(
    (key: string) => (newValue: string) =>
      setFilterValue(prev => ({ ...prev, [key]: newValue })),
    [setFilterValue]
  )

  return (
    <>
      {inputs.map(({ title, key, value }) => (
        <DebouncedInput
          key={key}
          {...{ title, value }}
          type={inputType}
          onChange={handleChange(key)}
        />
      ))}
    </>
  )
}

export default DateRangeFilter
