import { useCallback, useMemo, useState } from 'react'
import { useQueryActionState } from '@/hooks'
import { useAddFieldReset, useInputHandler } from '../../hooks'
import { useQuery } from '@tanstack/react-query'
import { Control } from '@/types'
import { Entity } from '@/services/config'
import { getFlatProps, Scheme } from '../../services/config'
import { REFETCH_INTERVALS } from '../../constants/refetchIntervals.const'
import { Button } from '@/components'
import BaseCombobox, { BaseComboboxProps } from '../BaseCombobox/BaseCombobox'
import { baseSorter } from '../../helpers'

const extractKeys = (array?: object[]) => {
  // TODO: mejorar, ya que ahora un item puede o no traer algún campo

  if (!array?.length) return

  return Object.keys(array[0])
}

export interface AutoComboboxProps
  extends Control,
    Pick<BaseComboboxProps, 'multiple'> {
  scheme: Scheme
  initSelected?: string[]
  initOptions?: Entity[]
}

const AutoCombobox = ({
  keyName,
  required,
  editMode,
  scheme,
  initSelected,
  initOptions: initialData,
  ...rest
}: AutoComboboxProps) => {
  const { key, service, refreshRate, anchorField } = scheme

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
    const options = await service.getForConnect!()

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

  const flatProps = useMemo(() => getFlatProps(scheme), [])

  const searchModes = useMemo(
    () =>
      searchModeKeys?.map(mode => ({
        mode,
        title: flatProps[mode].title,
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
            fields.push({ title: flatProps[mode].title, value: option[mode] }),
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

  const handleSearchModeChange = useInputHandler(value =>
    setSelectedSearchMode(value),
  )

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
          <fieldset className="search-mode">
            {searchModes.map(({ mode, title }) => (
              <label key={mode}>
                {title}
                <input
                  type="radio"
                  name={`search-mode-${keyName}`}
                  value={mode}
                  checked={selectedSearchMode === mode}
                  onChange={handleSearchModeChange}
                />
              </label>
            ))}
          </fieldset>
        )
      }
      searchSlot={
        <Button
          title="Actualizar opciones"
          faIcon="fa-solid fa-rotate"
          onAction={handleAction}
          {...{ actionState }}
        />
      }
    />
  )
}

export default AutoCombobox
