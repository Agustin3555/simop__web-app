import { RowSelectionState } from '@tanstack/react-table'
import { createContext, Dispatch, SetStateAction } from 'react'

interface RowSelectionContextProps {
  rowSelection: RowSelectionState
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>
  selectedRowIds: number[]
  deselectRows: () => void
}

export const RowSelectionContext = createContext<
  RowSelectionContextProps | undefined
>(undefined)
