import { ColumnFiltersColumn } from '@tanstack/react-table'
import Combobox, { ComboboxProps } from '../Combobox/Combobox'
import { Entity } from '@/services/config'
import { DerivedToState, StateToDerived, useDerivedState } from '../../hooks'
import { useCallback } from 'react'

interface BooleanFilterProps
  extends Pick<ComboboxProps, 'keyName' | 'title'>,
    Pick<ColumnFiltersColumn<Entity>, 'getFilterValue' | 'setFilterValue'> {
  falseText: string
  trueText: string
}

const BooleanFilter = ({
  keyName,
  title,
  falseText,
  trueText,
  getFilterValue,
  setFilterValue,
}: BooleanFilterProps) => {
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
