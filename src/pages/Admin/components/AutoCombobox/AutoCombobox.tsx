import { useCallback, useMemo, useState } from 'react'
import { useQueryActionState } from '@/hooks'
import { useAddFieldReset, useInputHandler } from '../../hooks'
import { useQuery } from '@tanstack/react-query'
import { Control } from '@/types'
import { Entity } from '@/services/config'
import { getFlatProps, Scheme } from '../../services/config'
import { REFETCH_INTERVALS } from '../../constants/refetchIntervals.const'
import { BaseCombobox } from '..'
import { BaseComboboxProps } from '../BaseCombobox/BaseCombobox'
import { baseSorter } from '../../helpers'

export type SearchModeKey = keyof Entity

const adapter = <T extends { id?: number }>(array?: T[]) =>
  array?.map(({ id, ...rest }) => ({ id: String(id), ...rest }))

export interface AutoComboboxProps extends Control {
  initSelected?: Partial<Entity>[]
  scheme: Scheme
  multiple?: boolean
}

const AutoCombobox = ({ initSelected, scheme, ...rest }: AutoComboboxProps) => {
  const { key, service, refreshRate, anchorField } = scheme

  const [enabled, setEnabled] = useState(false)
  const [searchModeKeys, setSearchModeKeys] = useState<SearchModeKey[]>()
  const [selectedSearchMode, setSelectedSearchMode] = useState(anchorField)

  const initSelectedAdapted = useMemo(() => adapter(initSelected), [])
  const [selected, setSelected] = useState(initSelectedAdapted ?? [])

  useAddFieldReset(() => setSelected([]))

  const selectedItems = useMemo(
    () =>
      selected.map(item => ({
        id: String(item.id),
        title: item[selectedSearchMode] as string,
      })),
    [selected, selectedSearchMode],
  )

  const queryFn = useCallback(async () => {
    const options = await service.getForConnect!()

    if (options.length !== 0) setSearchModeKeys(Object.keys(options[0]))

    return adapter(options)
  }, [])

  const {
    data: options,
    status,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [key, 'refs'],
    queryFn,
    initialData: initSelectedAdapted,
    refetchInterval: refreshRate ? REFETCH_INTERVALS[refreshRate] : Infinity,
    retry: false,
    enabled,
  })

  const flatProps = useMemo(() => getFlatProps(scheme), [])

  const searchModes = useMemo(
    () =>
      searchModeKeys?.map(mode => ({
        mode,
        title: flatProps[mode].title as string,
      })),
    [searchModeKeys],
  )

  const sorter = useCallback<BaseComboboxProps['sorter']>(
    (search, options) =>
      baseSorter(search, options, option => option[selectedSearchMode]),
    [selectedSearchMode],
  )

  const renderingOptions = useCallback<BaseComboboxProps['renderingOptions']>(
    options =>
      options.map(props => {
        const record: Record<
          SearchModeKey,
          { title: string; value: number | string }
        > = {}

        searchModeKeys?.forEach(mode => {
          record[mode] = {
            title: flatProps[mode].title as string,
            value: props[mode],
          }
        })

        return record
      }),
    [searchModeKeys],
  )

  const deselectItem = useCallback<BaseComboboxProps['deselectItem']>(
    id => setSelected(prev => prev.filter(item => item.id !== id)),
    [],
  )

  const handleEnter = useCallback(() => setEnabled(true), [])

  const resetHandleClick = useCallback(
    () => setSelected(initSelectedAdapted ?? []),
    [],
  )

  const actionState = useQueryActionState({ status, isFetching })

  const handleAction = useCallback(async () => await refetch(), [])

  const searchModeItemHandleChange = useInputHandler(value =>
    setSelectedSearchMode(value as SearchModeKey),
  )

  return (
    <BaseCombobox
      {...{
        ...rest,
        options,
        selected,
        setSelected,
        selectedItems,
        sorter,
        renderingOptions,
        deselectItem,
        handleEnter,
        resetHandleClick,
      }}
      refetchPack={{
        actionState,
        handleAction,
      }}
      searchModePack={{
        searchModes,
        selectedSearchMode,
        searchModeItemHandleChange,
      }}
    />
  )
}

export default AutoCombobox
