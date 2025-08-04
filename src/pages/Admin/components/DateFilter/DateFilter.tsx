import { FocusEventHandler, useCallback } from 'react'
import { DebouncedInput } from '..'
import { ColumnFiltersColumn } from '@tanstack/react-table'
import { DebouncedInputProps } from '../DebouncedInput/DebouncedInput'
import { LooseEntity } from '@/models/config'
import {
  FilterValueRange,
  FilterValueRangeKey,
} from '../NumberFilter/NumberFilter'

interface Props {
  column: ColumnFiltersColumn<LooseEntity>
  withTime?: boolean
}

const DateFilter = ({ column, withTime = false }: Props) => {
  const { getFilterValue, setFilterValue } = column

  const { min = '', max = '' } = (getFilterValue() as FilterValueRange) ?? {}

  const handleChange = useCallback(
    (key: FilterValueRangeKey) => (value: string) =>
      setFilterValue((prev: FilterValueRange) => ({ ...prev, [key]: value })),
    [setFilterValue],
  )

  const handleBlur = useCallback<FocusEventHandler<HTMLInputElement>>(e => {
    const input = e.currentTarget
    input.classList.toggle('filled', input.value !== '')
  }, [])

  const commonInputHTMLAttrs: Partial<DebouncedInputProps['inputHTMLAttrs']> = {
    type: withTime ? 'datetime-local' : 'date',
    onBlur: handleBlur,
  }

  return (
    <>
      <DebouncedInput
        title="Desde"
        value={min}
        hideLabel
        inputHTMLAttrs={commonInputHTMLAttrs}
        handleChange={handleChange('min')}
      />
      <DebouncedInput
        title="Hasta"
        value={max}
        hideLabel
        inputHTMLAttrs={commonInputHTMLAttrs}
        handleChange={handleChange('max')}
      />
    </>
  )
}

export default DateFilter
