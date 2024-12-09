import { HTMLInputTypeAttribute, useCallback, useMemo } from 'react'
import { Updater } from '@tanstack/react-table'
import { DebouncedInput } from '..'
import { TypeMeta } from '@/pages/Admin/components/LocalQuery/types'

interface DateTimeFilterProps {
  type: TypeMeta
  columnFilterValue: { min?: string; max?: string }
  setFilterValue: (updater: Updater<any>) => void
}

const DateTimeFilter = ({
  type,
  columnFilterValue = {},
  setFilterValue,
}: DateTimeFilterProps) => {
  const inputType = useMemo(() => {
    const matcher: Partial<Record<TypeMeta, HTMLInputTypeAttribute>> = {
      date: 'date',
      dateTime: 'datetime-local',
    }

    return matcher[type]
  }, [type])

  const inputs = [
    { title: 'Hasta', key: 'max', value: columnFilterValue.max },
    { title: 'Desde', key: 'min', value: columnFilterValue.min },
  ]

  const handleChange = useCallback(
    (key: string) => (newValue: string) =>
      setFilterValue(prev => ({ ...prev, [key]: newValue })),
    [setFilterValue],
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

export default DateTimeFilter
