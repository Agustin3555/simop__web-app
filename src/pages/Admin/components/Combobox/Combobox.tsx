import { useCallback, useMemo, useState } from 'react'
import { Control } from '@/types'
import { baseSorter } from '../../helpers'
import BaseCombobox, { BaseComboboxProps } from '../BaseCombobox/BaseCombobox'

export interface ComboboxProps
  extends Control,
    Pick<BaseComboboxProps, 'staticSelected' | 'multiple'>,
    Partial<Pick<BaseComboboxProps, 'selected' | 'setSelected'>> {
  options: { id: string; title: string }[]
  staticSelected?: string[]
  initSelected?: string[]
}

const Combobox = ({
  options,
  staticSelected,
  initSelected,
  selected,
  setSelected,
  ...rest
}: ComboboxProps) => {
  const [internalSelected, setInternalSelected] = useState<
    BaseComboboxProps['selected']
  >([])

  const [search, setSearch] = useState('')

  const fullSelection = useMemo(() => options.map(({ id }) => id), [options])

  const sortedOptions = useMemo<BaseComboboxProps['sortedOptions']>(
    () =>
      baseSorter(search, options, option => option.title).map(option => {
        const isStatic = staticSelected?.includes(option.id)
        return { ...option, isStatic }
      }),
    [options, search],
  )

  const getItemTitle = useCallback<BaseComboboxProps['getItemTitle']>(
    id => options.find(v => v.id === id)!.title,
    [options],
  )

  const selectedState = {
    selected: (selected ?? internalSelected).filter(
      v => !staticSelected?.includes(v),
    ),
    setSelected: setSelected ?? setInternalSelected,
  }

  const handleReset = useCallback(
    () => initSelected && selectedState.setSelected(initSelected),
    [],
  )

  return (
    <BaseCombobox
      {...{
        ...rest,

        ...selectedState,
        staticSelected,
        search,
        setSearch,

        fullSelection,
        sortedOptions,
        getItemTitle,
        handleReset,
      }}
    />
  )
}

export default Combobox
