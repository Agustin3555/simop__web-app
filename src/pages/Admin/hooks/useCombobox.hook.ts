import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLabel, UseLabelProps } from '@/hooks'
import { useInputHandler } from '.'
import { AppError } from '@/services/config'
import { Control, Ref } from '../types'

export interface Provider {
  provider: () => Promise<Ref[] | AppError>
}

export interface ComboboxProps extends UseLabelProps, Control, Provider {
  multiple?: boolean
}

interface UseComboboxProps extends UseLabelProps, Provider {}

export const useCombobox = ({
  title,
  required,
  provider,
}: UseComboboxProps) => {
  const { content, controlTitle } = useLabel({ title, required })
  const [options, setOptions] = useState<Ref[]>()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [firstLoad, setFirstLoad] = useState(false)
  const comboboxLayoutRef = useRef<HTMLDivElement>(null)

  const loading = useMemo(() => options === undefined, [options])

  const handleEnter = useCallback(() => setFirstLoad(true), [])

  const fetchAsync = useCallback(async () => {
    const response = await provider()

    if (response && !(response instanceof AppError)) setOptions(response)
  }, [provider])

  useEffect(() => {
    if (firstLoad) fetchAsync()
  }, [fetchAsync, firstLoad])

  const handleSearchChange = useInputHandler(newValue => setSearch(newValue))

  const handleToggleClick = useCallback(() => setOpen(prev => !prev), [])

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
      loading,
      controlTitle,
      search,
      content,
      comboboxLayoutRef,
      handleEnter,
      handleToggleClick,
      handleSearchChange,
    },
    options,
    sortedOptions,
  }
}

export interface BasicProps {
  basicProps: ReturnType<typeof useCombobox>['basicProps']
}
