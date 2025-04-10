import { useCallback, useMemo, useState } from 'react'
import { Control } from '@/types'
import { BaseComboboxProps } from '../BaseCombobox2/BaseCombobox'
import { baseSorter } from '../../helpers'
import BaseCombobox from '../BaseCombobox2/BaseCombobox'

export interface ComboboxProps
  extends Control,
    Pick<BaseComboboxProps, 'multiple' | 'reduceHeader'> {
  options: { id: string; title: string }[]
  selected?: string[]
}

const Combobox = ({
  options,
  selected: initSelected,
  ...rest
}: ComboboxProps) => {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(initSelected ?? [])

  const sortedOptions = useMemo<BaseComboboxProps['sortedOptions']>(
    () => baseSorter(search, options, option => option.title),
    [options, search],
  )

  const getItemTitle = useCallback<BaseComboboxProps['getItemTitle']>(
    id => options.find(option => option.id === id)!.title,
    [options],
  )

  return (
    <BaseCombobox
      {...{
        ...rest,

        search,
        setSearch,
        selected,
        setSelected,

        sortedOptions,
        getItemTitle,
      }}
    />
  )
}

export default Combobox
