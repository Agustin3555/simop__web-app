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

const NumberFilter = ({
  decimal,
  getFilterValue,
  setFilterValue,
  getFacetedMinMaxValues,
}: Props) => {
  const [minValue = '', maxValue = ''] =
    (getFilterValue() as FilterValuePair) ?? []

  const [minFaceted, maxFaceted] = getFacetedMinMaxValues() ?? []

  const commonProps: Partial<DebouncedInputProps> = {
    type: 'number',
    min: minFaceted,
    max: maxFaceted,
    step: decimal ? '0.01' : '',
  }

  const handleMinChange = useCallback<DebouncedInputProps['onChange']>(
    value => setFilterValue((prev: FilterValuePair) => [value, prev?.[1]]),
    [],
  )

  const handleMaxChange = useCallback<DebouncedInputProps['onChange']>(
    value => setFilterValue((prev: FilterValuePair) => [prev?.[0], value]),
    [],
  )

  return (
    <>
      <DebouncedInput
        value={minValue}
        placeholder={minFaceted ? `Min (${minFaceted})` : ''}
        onChange={handleMinChange}
        {...commonProps}
      />
      <DebouncedInput
        value={maxValue}
        placeholder={maxFaceted ? `Max (${maxFaceted})` : ''}
        onChange={handleMaxChange}
        {...commonProps}
      />
    </>
  )
}

export default NumberFilter
