import { useCallback, useMemo, useState } from 'react'
import { useQueryActionState } from '@/hooks'
import { useQuery } from '@tanstack/react-query'
import { Control } from '@/types'
import { LooseEntity } from '@/models/config'
import { REFETCH_INTERVALS } from '../../constants/refetchIntervals.const'
import { Button } from '@/components'
import { OptionSelectors } from '..'
import BaseCombobox, { BaseComboboxProps } from '../BaseCombobox/BaseCombobox'
import { baseSorter } from '../../helpers'
import { MetaModel } from '../../meta/metaModel'

// BUG: no carga el título de la selección inicial del AutoCombobox

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
  const { key, service, refreshRate, anchorField, props, getProps } = metaModel

  const calculateInitSelected = useMemo(
    () => (editMode ? initialData?.map(v => String(v.id)) : initSelected) ?? [],
    [],
  )

  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(calculateInitSelected)
  const [enabled, setEnabled] = useState(false)
  const [selectedSearchMode, setSelectedSearchMode] = useState(anchorField)

  const { data, status, isFetching, refetch } = useQuery({
    queryKey: [key, 'refs'],
    queryFn: service.getRefs!,
    refetchInterval: refreshRate ? REFETCH_INTERVALS[refreshRate] : Infinity,
    enabled,
    retry: false,
  })

  const { fields: searchModeKeys, rows: options } = data ?? {}

  const actionState = useQueryActionState({ status, isFetching })

  const handleAction = useCallback(async () => await refetch(), [])

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
    id => options?.find(v => String(v.id) === id)![selectedSearchMode] ?? '',
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
