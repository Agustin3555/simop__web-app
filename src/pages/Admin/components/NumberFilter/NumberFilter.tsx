import { useCallback } from 'react'
import { DebouncedInput } from '..'
import { DebouncedInputProps } from '../DebouncedInput/DebouncedInput'
import { ColumnFiltersColumn, FacetedColumn } from '@tanstack/react-table'
import { GeneralEntity } from '@/models/config'

// TODO: optimizar tratando el filtro como objeto al igual que DateTimeFilter
type FilterValuePair = [string, string] | undefined

interface Props
  extends Pick<
      ColumnFiltersColumn<GeneralEntity>,
      'getFilterValue' | 'setFilterValue'
    >,
    Pick<FacetedColumn<GeneralEntity>, 'getFacetedMinMaxValues'> {
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
    step: decimal ? '0.0001' : '',
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
          placeholder: minFaceted === undefined ? '' : `Min (${minFaceted})`,
          ...commonInputHTMLAttrs,
        }}
        handleChange={handleMinChange}
      />
      <DebouncedInput
        value={maxValue}
        hideLabel
        inputHTMLAttrs={{
          placeholder: maxFaceted === undefined ? '' : `Max (${maxFaceted})`,
          ...commonInputHTMLAttrs,
        }}
        handleChange={handleMaxChange}
      />
    </>
  )
}

export default NumberFilter
