import { InputField } from '@/types'
import { createContext, Dispatch, SetStateAction } from 'react'

export interface ComboboxCoreContextProps
  extends Pick<InputField, 'keyName' | 'isEditMode'> {
  isMultiple: boolean

  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

export const ComboboxCoreContext = createContext<
  ComboboxCoreContextProps | undefined
>(undefined)
