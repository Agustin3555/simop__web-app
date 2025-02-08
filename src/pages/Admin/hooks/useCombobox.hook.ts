import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLabel, UseLabelProps } from '@/hooks'
import { useInputHandler } from '.'
import { Control, Long, Ref } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { Scheme } from '../services/config'
import { REFETCH_INTERVALS } from '../constants/refetchIntervals.const'

interface Aux {
  required: UseLabelProps['required']
  scheme: Scheme
}

export interface ComboboxProps extends Aux, Control {
  multiple?: boolean
}

interface UseComboboxProps extends Aux, Long {}

export const useCombobox = ({ scheme, required, long }: UseComboboxProps) => {
  const { key, title, service, refreshRate } = scheme

  const { content, controlTitle } = useLabel({
    title: title.singular,
    required,
  })

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [enabled, setEnabled] = useState(false)
  const comboboxLayoutRef = useRef<HTMLDivElement>(null)

  const { data: options, refetch } = useQuery<Ref[]>({
    queryKey: [key, 'refs'],
    queryFn: service.getForConnect,
    refetchInterval: refreshRate ? REFETCH_INTERVALS[refreshRate] : Infinity,
    retry: false,
    enabled,
  })

  const sortedOptions = useMemo(() => {
    if (!options) return

    const lowerSearch = search.trim().toLowerCase()

    // Si el campo de búsqueda está vacío, no modificar el orden
    if (!lowerSearch) return options

    return options.toSorted((a, b) => {
      const aTitle = a.title.toLowerCase()
      const bTitle = b.title.toLowerCase()

      if (aTitle === lowerSearch && bTitle !== lowerSearch) return -1
      if (bTitle === lowerSearch && aTitle !== lowerSearch) return 1

      if (aTitle.startsWith(lowerSearch) && !bTitle.startsWith(lowerSearch))
        return -1
      if (bTitle.startsWith(lowerSearch) && !aTitle.startsWith(lowerSearch))
        return 1

      if (aTitle.includes(lowerSearch) && !bTitle.includes(lowerSearch))
        return -1
      if (bTitle.includes(lowerSearch) && !aTitle.includes(lowerSearch))
        return 1

      return 0
    })
  }, [options, search])

  const handleEnter = useCallback(() => setEnabled(true), [])

  const handleSearchChange = useInputHandler(newValue => setSearch(newValue))

  const handleToggleClick = useCallback(() => setOpen(prev => !prev), [])

  const handleClickOutside = useCallback((event: MouseEvent) => {
    // Cierra el componente si el click es fuera del propio elemento
    if (
      comboboxLayoutRef.current &&
      !comboboxLayoutRef.current.contains(event.target as Node)
    )
      setOpen(false)
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside])

  return {
    basicProps: {
      open,
      refetch,
      controlTitle,
      search,
      content,
      comboboxLayoutRef,
      handleEnter,
      handleToggleClick,
      handleSearchChange,
      long,
      isVoid: !(options && options.length),
    },
    options,
    sortedOptions,
  }
}
