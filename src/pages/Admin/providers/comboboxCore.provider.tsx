import { ReactNode, useState } from 'react'
import {
  ComboboxCoreContext,
  ComboboxCoreContextProps,
} from '../contexts/comboboxCore.context'

interface ComboboxCoreProviderProps
  extends Pick<
    ComboboxCoreContextProps,
    'keyName' | 'isEditMode' | 'isMultiple'
  > {
  children: ReactNode
}

export const ComboboxCoreProvider = ({
  keyName,
  isEditMode,
  isMultiple,
  children,
}: ComboboxCoreProviderProps) => {
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ComboboxCoreContext.Provider
      value={{
        keyName,
        isEditMode,
        isMultiple,

        isOpen,
        setIsOpen,
        search,
        setSearch,
      }}
    >
      {children}
    </ComboboxCoreContext.Provider>
  )
}
