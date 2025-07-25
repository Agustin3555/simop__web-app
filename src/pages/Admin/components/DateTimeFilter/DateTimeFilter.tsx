import { useCallback } from 'react'
import { DebouncedInput } from '..'
import { ColumnFiltersColumn } from '@tanstack/react-table'
import { DebouncedInputProps } from '../DebouncedInput/DebouncedInput'
import { LooseEntity } from '@/models/config'

type FilterValuePair = { min: string; max: string } | undefined

interface Props
  extends Pick<
    ColumnFiltersColumn<LooseEntity>,
    'getFilterValue' | 'setFilterValue'
  > {
  withTime?: boolean
}

// BUG

const DateTimeFilter = ({
  withTime = false,
  getFilterValue,
  setFilterValue,
}: Props) => {
  const { min = '', max = '' } = (getFilterValue() as FilterValuePair) ?? {}

  const commonInputHTMLAttrs: Partial<DebouncedInputProps['inputHTMLAttrs']> = {
    type: withTime ? 'datetime-local' : 'date',
    onBlur: e => {
      const input = e.currentTarget

      input.classList.toggle('filled', input.value !== '')
    },
  }

  const handleChange = useCallback<
    (key: string) => DebouncedInputProps['handleChange']
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

export default DateTimeFilter
