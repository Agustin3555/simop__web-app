import { useCallback, useMemo, useState } from 'react'
import { useQueryActionState } from '@/hooks'
import { useAddFieldReset, useInputHandler } from '../../hooks'
import { useQuery } from '@tanstack/react-query'
import { Control } from '@/types'
import { Entity } from '@/services/config'
import { getFlatProps, Scheme } from '../../services/config'
import { REFETCH_INTERVALS } from '../../constants/refetchIntervals.const'
import BaseCombobox, { BaseComboboxProps } from '../BaseCombobox2/BaseCombobox'
import { baseSorter } from '../../helpers'
import { StateButton } from '@/components'

const extractKeys = (array?: object[]) => {
  if (!array?.length) return

  return Object.keys(array[0])
}

export interface AutoComboboxProps
  extends Control,
    Pick<BaseComboboxProps, 'multiple'> {
  scheme: Scheme
  selected?: string[]
  options?: Partial<Entity>[]
}

const AutoCombobox = ({
  keyName,
  scheme,
  selected: initSelected,
  options: initialData,
  ...rest
}: AutoComboboxProps) => {
  const { key, service, refreshRate, anchorField } = scheme

  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(initSelected ?? [])
  const [enabled, setEnabled] = useState(false)
  const [searchModeKeys, setSearchModeKeys] = useState(extractKeys(initialData))
  const [selectedSearchMode, setSelectedSearchMode] = useState(anchorField)

  useAddFieldReset(() => setSelected([]))

  const queryFn = useCallback(async () => {
    const options = await service.getForConnect!()

    setSearchModeKeys(extractKeys(options))
    return options
  }, [])

  const {
    data: options,
    status,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [key, 'refs'],
    queryFn,
    initialData,
    refetchInterval: refreshRate ? REFETCH_INTERVALS[refreshRate] : Infinity,
    retry: false,
    enabled,
  })

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
      options!.find(option => String(option.id) === id)![selectedSearchMode],
    [options, selectedSearchMode],
  )

  const sortedOptions = useMemo<BaseComboboxProps['sortedOptions']>(
    () =>
      baseSorter(search, enhancedOptions, option => getItemTitle(option.id)),
    [enhancedOptions, getItemTitle, search],
  )

  const handleEnter = useCallback(() => setEnabled(true), [])

  const resetHandleClick = useCallback(
    () => setSelected(initSelected ?? []),
    [],
  )

  const searchModeItemHandleChange = useInputHandler(value =>
    setSelectedSearchMode(value),
  )

  const actionState = useQueryActionState({ status, isFetching })

  const handleAction = useCallback(async () => await refetch(), [])

  return (
    <BaseCombobox
      {...{
        ...rest,
        keyName,

        search,
        setSearch,
        selected,
        setSelected,

        sortedOptions,
        getItemTitle,
        handleEnter,
        resetHandleClick,
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
                  onChange={searchModeItemHandleChange}
                />
              </label>
            ))}
          </fieldset>
        )
      }
      searchSlot={
        <StateButton
          text="Actualizar opciones"
          hiddenText
          faIcon="fa-solid fa-rotate"
          // BUG: declarar como type button, porque se establece como submit al estar dentro de un form
          {...{ actionState, handleAction }}
        />
      }
    />
  )
}

export default AutoCombobox
