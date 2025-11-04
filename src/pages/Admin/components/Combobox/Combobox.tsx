import { useCallback, useEffect, useMemo, useState } from 'react'
import { useComboboxCore } from '../../hooks'
import { baseSorter } from '../../helpers'
import BaseCombobox, { BaseComboboxProps } from '../BaseCombobox/BaseCombobox'
import { ComboboxCoreContextProps } from '../../contexts/comboboxCore.context'
import { ComboboxCoreProvider } from '../../providers/comboboxCore.provider'

export interface ComboboxInnerProps
  extends Pick<
      BaseComboboxProps,
      'title' | 'hideLabel' | 'isRequired' | 'staticSelected'
    >,
    Partial<Pick<BaseComboboxProps, 'selected' | 'setSelected'>> {
  options: { id: string; title: string }[]
  staticSelected?: string[]
  initSelected?: string[]
}

const ComboboxInner = ({
  options,
  staticSelected,
  initSelected,
  selected,
  setSelected,
  ...rest
}: ComboboxInnerProps) => {
  const [internalSelected, setInternalSelected] = useState<
    BaseComboboxProps['selected']
  >([])

  const { search } = useComboboxCore()

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

  useEffect(() => {
    initSelected && selectedState.setSelected(initSelected)
  }, [])

  return (
    <BaseCombobox
      {...{
        ...rest,

        ...selectedState,
        staticSelected,

        fullSelection,
        sortedOptions,
        getItemTitle,
        handleReset,
      }}
    />
  )
}

export interface ComboboxProps
  extends Omit<ComboboxInnerProps, 'hideLabel' | 'isRequired'>,
    Partial<Pick<ComboboxInnerProps, 'hideLabel' | 'isRequired'>>,
    Pick<ComboboxCoreContextProps, 'keyName'>,
    Partial<Pick<ComboboxCoreContextProps, 'isEditMode' | 'isMultiple'>> {}

const Combobox = ({
  keyName,
  hideLabel = false,
  isRequired = false,
  isEditMode = false,
  isMultiple = false,
  ...rest
}: ComboboxProps) => (
  <ComboboxCoreProvider {...{ keyName, isEditMode, isMultiple }}>
    <ComboboxInner
      isRequired={isEditMode ? false : isRequired}
      {...{ hideLabel, ...rest }}
    />
  </ComboboxCoreProvider>
)

export default Combobox
