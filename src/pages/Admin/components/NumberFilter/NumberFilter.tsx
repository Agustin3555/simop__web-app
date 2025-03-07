import { useCallback } from 'react'
import { DebouncedInput } from '..'
import { DebouncedInputProps } from '../DebouncedInput/DebouncedInput'
import { ColumnFiltersColumn, FacetedColumn } from '@tanstack/react-table'
import { Entity } from '@/services/config'

// TODO: optimizar tratando el filtro como objeto al igual que DateTimeFilter
type FilterValuePair = [string, string] | undefined

interface Props
  extends Pick<
      ColumnFiltersColumn<Entity>,
      'getFilterValue' | 'setFilterValue'
    >,
    Pick<FacetedColumn<Entity>, 'getFacetedMinMaxValues'> {
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
    step: decimal ? '0.01' : '',
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
          placeholder: minFaceted ? `Min (${minFaceted})` : '',
          ...commonInputHTMLAttrs,
        }}
        handleChange={handleMinChange}
      />
      <DebouncedInput
        value={maxValue}
        hideLabel
        inputHTMLAttrs={{
          placeholder: maxFaceted ? `Max (${maxFaceted})` : '',
          ...commonInputHTMLAttrs,
        }}
        handleChange={handleMaxChange}
      />
    </>
  )
}

export default NumberFilter
