import { useCallback } from 'react'
import { DebouncedInput } from '..'
import { ColumnFiltersColumn } from '@tanstack/react-table'
import { DebouncedInputProps } from '../DebouncedInput/DebouncedInput'
import { Entity } from '@/services/config'

type FilterValuePair = { min: string; max: string } | undefined

interface Props
  extends Pick<
    ColumnFiltersColumn<Entity>,
    'getFilterValue' | 'setFilterValue'
  > {
  notTime?: boolean
}

const DateTimeFilter = ({
  notTime = false,
  getFilterValue,
  setFilterValue,
}: Props) => {
  const { min = '', max = '' } = (getFilterValue() as FilterValuePair) ?? {}

  const commonProps: Partial<DebouncedInputProps> = {
    type: notTime ? 'date' : 'datetime-local',
  }

  const handleChange = useCallback<
    (key: string) => DebouncedInputProps['onChange']
  >(
    key => value =>
      setFilterValue((prev: FilterValuePair) => ({ ...prev, [key]: value })),
    [],
  )

  return (
    <>
      <DebouncedInput
        title="Desde"
        value={min}
        onChange={handleChange('min')}
        {...commonProps}
      />
      <DebouncedInput
        title="Hasta"
        value={max}
        onChange={handleChange('max')}
        {...commonProps}
      />
    </>
  )
}

export default DateTimeFilter
