import { useCallback, useMemo, useState } from 'react'
import { Control } from '@/types'
import { BaseComboboxProps, BasicOption } from '../BaseCombobox/BaseCombobox'
import { BaseCombobox } from '..'
import { baseSorter } from '../../helpers'

export interface ComboboxProps
  extends Control,
    Pick<BaseComboboxProps, 'reportOption'> {
  options: BasicOption[]
  selectedIds?: BasicOption['id'][]
  multiple?: boolean
}

const Combobox = ({ options, selectedIds, ...rest }: ComboboxProps) => {
  const initSelected = useMemo(() => {
    if (!selectedIds || selectedIds.length === 0) return

    return options.filter(({ id }) => selectedIds.includes(id))
  }, [])

  const [selected, setSelected] = useState(initSelected ?? [])

  const sorter = useCallback<BaseComboboxProps['sorter']>(
    (search, options) => baseSorter(search, options, option => option.title),
    [],
  )

  const deselectItem = useCallback<BaseComboboxProps['deselectItem']>(
    id => setSelected(prev => prev.filter(item => item.id !== id)),
    [],
  )

  return (
    <BaseCombobox
      {...{
        ...rest,
        options,
        selected,
        setSelected,
        selectedItems: selected,
        sorter,
        deselectItem,
      }}
    />
  )
}

export default Combobox
