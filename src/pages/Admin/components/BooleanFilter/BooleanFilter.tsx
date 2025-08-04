import { useCallback } from 'react'
import { ColumnFiltersColumn } from '@tanstack/react-table'
import Combobox, { ComboboxProps } from '../Combobox/Combobox'
import { LooseEntity } from '@/models/config'
import { DerivedToState, StateToDerived, useDerivedState } from '../../hooks'

interface BooleanFilterProps extends Pick<ComboboxProps, 'keyName' | 'title'> {
  column: ColumnFiltersColumn<LooseEntity>
  falseText: string
  trueText: string
}

const BooleanFilter = ({
  column,
  keyName,
  title,
  falseText,
  trueText,
}: BooleanFilterProps) => {
  const { getFilterValue, setFilterValue } = column

  const fromFilterValueToKeys = useCallback<StateToDerived<unknown, string[]>>(
    filterValue => (filterValue === undefined ? [] : [String(filterValue)]),
    [],
  )

  const fromKeysToFilterValue = useCallback<DerivedToState<unknown, string[]>>(
    keys => {
      const filterValue = keys[0]
      return filterValue === undefined ? filterValue : filterValue === 'true'
    },
    [],
  )

  const [selected, setSelected] = useDerivedState(
    getFilterValue(),
    setFilterValue,
    fromFilterValueToKeys,
    fromKeysToFilterValue,
  )

  return (
    <Combobox
      hideLabel
      reduceHeader
      options={[
        { id: 'false', title: falseText },
        { id: 'true', title: trueText },
      ]}
      {...{ keyName, title, selected, setSelected }}
    />
  )
}

export default BooleanFilter
