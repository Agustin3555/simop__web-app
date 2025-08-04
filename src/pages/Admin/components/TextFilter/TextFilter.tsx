import { useCallback } from 'react'
import { ColumnFiltersColumn } from '@tanstack/react-table'
import { DebouncedInput } from '..'
import { LooseEntity } from '@/models/config'

interface Props {
  column: ColumnFiltersColumn<LooseEntity>
}

const TextFilter = ({ column }: Props) => {
  const { getFilterValue, setFilterValue } = column

  const filterValue = getFilterValue() as undefined | string

  const handleChange = useCallback(
    (value: string) => setFilterValue(value),
    [setFilterValue],
  )

  return (
    <DebouncedInput
      value={filterValue ?? ''}
      hideLabel
      inputHTMLAttrs={{ placeholder: 'Buscar...' }}
      {...{ handleChange }}
    />
  )
}

export default TextFilter
