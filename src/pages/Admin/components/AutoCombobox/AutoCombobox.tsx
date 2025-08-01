import { useCallback, useMemo, useState } from 'react'
import { useQueryActionState } from '@/hooks'
import { useAddFieldReset } from '../../hooks'
import { useQuery } from '@tanstack/react-query'
import { Control } from '@/types'
import { LooseEntity } from '@/models/config'
import { REFETCH_INTERVALS } from '../../constants/refetchIntervals.const'
import { Button } from '@/components'
import { OptionSelectors } from '..'
import BaseCombobox, { BaseComboboxProps } from '../BaseCombobox/BaseCombobox'
import { baseSorter, extractKeys } from '../../helpers'
import { MetaModel } from '../../meta/metaModel'

export interface AutoComboboxProps
  extends Control,
    Pick<BaseComboboxProps, 'multiple'> {
  metaModel: MetaModel
  initSelected?: string[]
  initOptions?: LooseEntity[]
}

const AutoCombobox = ({
  keyName,
  required,
  editMode,
  metaModel,
  initSelected,
  initOptions: initialData,
  ...rest
}: AutoComboboxProps) => {
  const { key, service, refreshRate, anchorField, props } = metaModel

  const calculateInitSelected = useMemo(
    () =>
      (editMode ? initialData?.map(({ id }) => String(id)) : initSelected) ??
      [],
    [],
  )

  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(calculateInitSelected)
  const [enabled, setEnabled] = useState(false)
  const [searchModeKeys, setSearchModeKeys] = useState(extractKeys(initialData))
  const [selectedSearchMode, setSelectedSearchMode] = useState(anchorField)

  useAddFieldReset(() => setSelected([]))

  const queryFn = useCallback(async () => {
    const options = await service.getRefs!()

    setSearchModeKeys(extractKeys(options))
    return options
  }, [])

  const { data, status, isFetching, refetch } = useQuery({
    queryKey: [key, 'refs'],
    queryFn,
    refetchInterval: refreshRate ? REFETCH_INTERVALS[refreshRate] : Infinity,
    retry: false,
    enabled,
  })

  const actionState = useQueryActionState({ status, isFetching })

  const handleAction = useCallback(async () => await refetch(), [])

  const options = useMemo(() => data || initialData, [data])

  const fullSelection = useMemo(
    () => options?.map(({ id }) => String(id)),
    [options],
  )

  const searchModes = useMemo(
    () =>
      searchModeKeys?.map(mode => ({
        value: mode,
        title: props[mode].title,
      })),
    [searchModeKeys],
  )

  const enhancedOptions = useMemo<BaseComboboxProps['sortedOptions']>(
    () =>
      options?.map(option => {
        const fields: NonNullable<
          BaseComboboxProps['sortedOptions'][number]['fields']
        > = []

        searchModeKeys
          ?.filter(mode => mode !== selectedSearchMode)
          .forEach(mode =>
            fields.push({ title: props[mode].title, value: option[mode] }),
          )

        return { id: String(option.id), fields }
      }) ?? [],
    [options, searchModeKeys, selectedSearchMode],
  )

  const getItemTitle = useCallback<BaseComboboxProps['getItemTitle']>(
    id =>
      options?.find(option => String(option.id) === id)![selectedSearchMode] ??
      '',
    [options, selectedSearchMode],
  )

  const sortedOptions = useMemo<BaseComboboxProps['sortedOptions']>(
    () =>
      baseSorter(search, enhancedOptions, option => getItemTitle(option.id)),
    [enhancedOptions, getItemTitle, search],
  )

  const handleEnter = useCallback(() => setEnabled(true), [])

  const handleReset = useCallback(() => setSelected(calculateInitSelected), [])

  return (
    <BaseCombobox
      required={editMode ? false : required}
      {...{
        ...rest,
        keyName,
        editMode,

        search,
        setSearch,
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
          onAction={handleAction}
          {...{ actionState }}
        />
      }
    />
  )
}

export default AutoCombobox
