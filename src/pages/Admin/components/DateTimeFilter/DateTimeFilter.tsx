import { useCallback } from 'react'
import { DebouncedInput } from '..'
import { Updater } from '@tanstack/react-table'

interface Props {
  notTime?: boolean
  filterValue: { min?: string; max?: string }
  setFilterValue: (updater: Updater<any>) => void
}

const DateTimeFilter = ({
  notTime = false,
  filterValue,
  setFilterValue,
}: Props) => {
  const inputs = [
    { title: 'Desde', key: 'min', value: filterValue.min },
    { title: 'Hasta', key: 'max', value: filterValue.max },
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
          type={notTime ? 'date' : 'datetime-local'}
          onChange={handleChange(key)}
        />
      ))}
    </>
  )
}

export default DateTimeFilter
