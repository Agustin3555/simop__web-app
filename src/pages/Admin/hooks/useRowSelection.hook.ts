import { useContext } from 'react'
import { RowSelectionContext } from '../contexts'

export const useRowSelection = () => {
  const context = useContext(RowSelectionContext)

  return context!
}
