import { useCallback } from 'react'
import { DebouncedInput } from '..'
import { DebouncedInputProps } from '../DebouncedInput/DebouncedInput'
import { ColumnFiltersColumn, FacetedColumn } from '@tanstack/react-table'
import { LooseEntity } from '@/models/config'

// TODO: optimizar tratando el filtro como objeto al igual que DateTimeFilter
type FilterValuePair = [string, string] | undefined

interface Props
  extends Pick<
      ColumnFiltersColumn<LooseEntity>,
      'getFilterValue' | 'setFilterValue'
    >,
    Pick<FacetedColumn<LooseEntity>, 'getFacetedMinMaxValues'> {
  decimal: boolean
}

// BUG

const NumberFilter = ({
  decimal,
  getFilterValue,
  setFilterValue,
  getFacetedMinMaxValues,
}: Props) => {
  const [minValue = '', maxValue = ''] =
    (getFilterValue() as FilterValuePair) ?? []

  const [minFaceted, maxFaceted] = getFacetedMinMaxValues() ?? []

  const commonInputHTMLAttrs: Partial<DebouncedInputProps['inputHTMLAttrs']> = {
    type: 'number',
    min: minFaceted,
    max: maxFaceted,
    step: decimal ? '0.000001' : '',
  }

  const handleMinChange = useCallback<DebouncedInputProps['handleChange']>(
    value => setFilterValue((prev: FilterValuePair) => [value, prev?.[1]]),
    [],
  )

  const handleMaxChange = useCallback<DebouncedInputProps['handleChange']>(
    value => setFilterValue((prev: FilterValuePair) => [prev?.[0], value]),
    [],
  )

  return (
    <>
      <DebouncedInput
        value={minValue}
        hideLabel
        inputHTMLAttrs={{
          placeholder: minFaceted === undefined ? '' : 'Min...',
          ...commonInputHTMLAttrs,
        }}
        handleChange={handleMinChange}
      />
      <DebouncedInput
        value={maxValue}
        hideLabel
        inputHTMLAttrs={{
          placeholder: maxFaceted === undefined ? '' : 'Max...',
          ...commonInputHTMLAttrs,
        }}
        handleChange={handleMaxChange}
      />
    </>
  )
}

export default NumberFilter
