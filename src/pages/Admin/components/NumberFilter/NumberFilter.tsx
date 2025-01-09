import { useCallback } from 'react'
import { DebouncedInput } from '..'
import { DebouncedInputProps } from '../DebouncedInput/DebouncedInput'
import { ColumnFiltersColumn, FacetedColumn } from '@tanstack/react-table'
import { Entity } from '@/services/config'

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
        onChange={handleMinChange}
        placeholder={minFaceted ? `Min (${minFaceted})` : ''}
        {...commonProps}
      />
      <DebouncedInput
        value={maxValue}
        onChange={handleMaxChange}
        placeholder={maxFaceted ? `Max (${maxFaceted})` : ''}
        {...commonProps}
      />
    </>
  )
}

export default NumberFilter
