import { useCallback, useMemo, useState } from 'react'
import { Control } from '@/types'
import { baseSorter } from '../../helpers'
import BaseCombobox, { BaseComboboxProps } from '../BaseCombobox/BaseCombobox'

export interface ComboboxProps
  extends Control,
    Pick<
      BaseComboboxProps,
      'multiple' | 'reduceHeader' | 'selected' | 'setSelected'
    > {
  options: { id: string; title: string }[]
  initSelected?: string[]
}

const Combobox = ({
  options,
  initSelected,
  setSelected,
  ...rest
}: ComboboxProps) => {
  const [search, setSearch] = useState('')

  const fullSelection = useMemo(() => options.map(({ id }) => id), [options])

  const sortedOptions = useMemo<BaseComboboxProps['sortedOptions']>(
    () => baseSorter(search, options, option => option.title),
    [options, search],
  )

  const getItemTitle = useCallback<BaseComboboxProps['getItemTitle']>(
    id => options.find(option => option.id === id)!.title,
    [options],
  )

  const handleReset = useCallback(
    () => initSelected && setSelected(initSelected),
    [],
  )

  return (
    <BaseCombobox
      {...{
        ...rest,

        search,
        setSearch,
        setSelected,

        fullSelection,
        sortedOptions,
        getItemTitle,
        handleReset,
      }}
    />
  )
}

export default Combobox
