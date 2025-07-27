import { useContext } from 'react'
import { RowSelectionContext } from '../contexts/rowSelection.context'

export const useRowSelection = () => {
  const context = useContext(RowSelectionContext)

  return context
}
