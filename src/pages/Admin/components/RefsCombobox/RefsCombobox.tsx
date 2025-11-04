import { useCallback, useMemo, useState } from 'react'
import { useQueryActionState } from '@/hooks'
import { useComboboxCore } from '../../hooks'
import { useQuery } from '@tanstack/react-query'
import { LooseEntity } from '@/models/config'
import { REFETCH_INTERVALS } from '../../constants/refetchIntervals.const'
import { Button } from '@/components'
import BaseCombobox, { BaseComboboxProps } from '../BaseCombobox/BaseCombobox'
import { baseSorter } from '../../helpers'
import { MetaModel } from '../../meta/metaModel'
import { OptionSelectors } from '../../components'
import { ComboboxCoreProvider } from '../../providers/comboboxCore.provider'
import { ComboboxCoreContextProps } from '../../contexts/comboboxCore.context'

export interface RefsComboboxInnerProps
  extends Pick<BaseComboboxProps, 'title' | 'hideLabel' | 'isRequired'> {
  metaModel: MetaModel
  initSelected?: string[]
  initOptions?: LooseEntity[]
}

const RefsComboboxInner = ({
  metaModel: {
    key,
    service: { getRefs },
    refreshRate,
    anchorField,
    props,
    getProps,
  },
  initSelected,
  initOptions: initialData,
  ...rest
}: RefsComboboxInnerProps) => {
  const { keyName, isEditMode, search } = useComboboxCore()

  const calculateInitSelected = useMemo(
    () =>
      (isEditMode ? initialData?.map(v => String(v.id)) : initSelected) ?? [],
    [],
  )

  const [selected, setSelected] = useState(calculateInitSelected)
  const [enabled, setEnabled] = useState(false)
  const [selectedSearchMode, setSelectedSearchMode] = useState(anchorField)

  const { data, status, isFetching, refetch } = useQuery({
    queryKey: [key, 'refs'],
    queryFn: getRefs,
    refetchInterval: refreshRate ? REFETCH_INTERVALS[refreshRate] : Infinity,
    enabled,
    retry: false,
  })

  const { fields: searchModeKeys, rows: options } = data ?? {}

  const actionState = useQueryActionState({ status, isFetching })

  const fullSelection = useMemo(
    () => options?.map(({ id }) => String(id)),
    [options],
  )

  const searchModes = useMemo(
    () =>
      searchModeKeys &&
      getProps(searchModeKeys).map(({ key, title }) => ({ value: key, title })),
    [searchModeKeys],
  )

  const getItemTitle = useCallback<BaseComboboxProps['getItemTitle']>(
    id => options?.find(v => String(v.id) === id)![selectedSearchMode],
    [options, selectedSearchMode],
  )

  const enhancedOptions = useMemo<BaseComboboxProps['sortedOptions']>(() => {
    if (!options) return []

    return options.map(option => {
      const fields: NonNullable<
        BaseComboboxProps['sortedOptions'][number]['fields']
      > = []

      searchModeKeys
        ?.filter(mode => mode !== selectedSearchMode)
        .forEach(mode =>
          fields.push({ title: props[mode].title, value: option[mode] }),
        )

      return { id: String(option.id), fields }
    })
  }, [options, searchModeKeys, selectedSearchMode])

  const sortedOptions = useMemo<BaseComboboxProps['sortedOptions']>(
    () =>
      baseSorter(search, enhancedOptions, option => getItemTitle(option.id)),
    [enhancedOptions, getItemTitle, search],
  )

  const handleUpdateAction = useCallback(async () => {
    await refetch()
  }, [])

  const handleEnter = useCallback(() => setEnabled(true), [])

  const handleReset = useCallback(() => setSelected(calculateInitSelected), [])

  return (
    <BaseCombobox
      {...{
        ...rest,

        selected,
        setSelected,

        fullSelection,
        sortedOptions,
        getItemTitle,
        handleEnter,
        handleReset,
      }}
      modeSlot={
        searchModes && (
          <OptionSelectors
            name={`search-mode-${keyName}`}
            selected={selectedSearchMode}
            setSelected={setSelectedSearchMode}
            options={searchModes}
          />
        )
      }
      searchSlot={
        <Button
          title="Actualizar opciones"
          faIcon="fa-solid fa-rotate"
          size="s"
          type="secondary"
          onAction={handleUpdateAction}
          {...{ actionState }}
        />
      }
    />
  )
}

export interface RefsProps
  extends Omit<RefsComboboxInnerProps, 'hideLabel' | 'isRequired'>,
    Partial<Pick<RefsComboboxInnerProps, 'hideLabel' | 'isRequired'>>,
    Pick<ComboboxCoreContextProps, 'keyName'>,
    Partial<Pick<ComboboxCoreContextProps, 'isEditMode' | 'isMultiple'>> {}

const RefsCombobox = ({
  keyName,
  hideLabel = false,
  isRequired = false,
  isEditMode = false,
  isMultiple = false,
  ...rest
}: RefsProps) => (
  <ComboboxCoreProvider {...{ keyName, isEditMode, isMultiple }}>
    <RefsComboboxInner
      isRequired={isEditMode ? false : isRequired}
      {...{ hideLabel, ...rest }}
    />
  </ComboboxCoreProvider>
)

export default RefsCombobox
