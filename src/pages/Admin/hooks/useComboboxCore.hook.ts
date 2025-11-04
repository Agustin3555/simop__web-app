import { useContext } from 'react'
import { ComboboxCoreContext } from '../contexts/comboboxCore.context'

export const useComboboxCore = () => {
  const ctx = useContext(ComboboxCoreContext)
  if (!ctx) throw new Error()
  return ctx
}
