import { useCallback, useMemo, useState } from 'react'
import { Control } from '@/types'
import { BaseComboboxProps } from '../BaseCombobox/BaseCombobox'
import { BaseCombobox } from '..'
import { baseSorter } from '../../helpers'

interface Option {
  id: string
  title: string
}

export interface ComboboxProps extends Control {
  options: Option[]
  selectedIds?: Option['id'][]
  multiple?: boolean
}

const Combobox = ({ options, selectedIds, ...rest }: ComboboxProps) => {
  const initSelected = useMemo(() => {
    if (!selectedIds || selectedIds.length === 0) return

    return options.filter(({ id }) => selectedIds.includes(id))
  }, [])

  const [selected, setSelected] = useState(initSelected ?? [])

  const sorter = useCallback<BaseComboboxProps<Option>['sorter']>(
    (search, options) => baseSorter(search, options, option => option.title),
    [],
  )

  const renderingOptions = useCallback<
    BaseComboboxProps<Option>['renderingOptions']
  >(
    options =>
      options.map(props => {
        // const record: Record<
        //   SearchMode,
        //   { title: string; value: number | string }
        // > = {}
        // searchModes.forEach(mode => {
        //   record[mode] = {
        //     title: flatProps[mode].title as string,
        //     value: props[mode],
        //   }
        // })
        // return record
      }),
    [],
  )

  const deselectItem = useCallback<BaseComboboxProps<Option>['deselectItem']>(
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
        renderingOptions,
        deselectItem,
      }}
    />
  )
}

export default Combobox
