import {
  ChangeEventHandler,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useLabel, UseLabelProps } from '@/hooks'
import { useInputHandler } from '.'

export interface Options {
  id: number
  title: string
}

interface UseComboboxProps extends UseLabelProps {
  options: Options[]
}

export interface BasicProps {
  basicProps: {
    open: boolean
    controlTitle: string
    search: string
    content: JSX.Element
    comboboxLayoutRef: MutableRefObject<HTMLDivElement>
    handleToggleClick: () => void
    handleSearchChange: ChangeEventHandler<HTMLInputElement>
  }
}

export interface UseComboboxResult extends BasicProps {
  sortedOptions: Options[]
}

export const useCombobox = ({
  title,
  required,
  options,
}: UseComboboxProps): UseComboboxResult => {
  const { content, controlTitle } = useLabel({ title, required })
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const comboboxLayoutRef = useRef<HTMLDivElement>(null)

  const handleSearchChange = useInputHandler(newValue => setSearch(newValue))

  const handleToggleClick = useCallback(() => setOpen(prev => !prev), [])

  const sortedOptions = useMemo(() => {
    const lowerSearch = search.trim().toLowerCase()

    // Si el campo de búsqueda está vacío, no modificar el orden
    if (!lowerSearch) return options

    return [...options].sort((a, b) => {
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
      controlTitle,
      search,
      content,
      comboboxLayoutRef,
      handleToggleClick,
      handleSearchChange,
    },
    sortedOptions,
  }
}
