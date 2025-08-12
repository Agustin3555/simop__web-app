import { createContext, Dispatch, SetStateAction } from 'react'
import {
  ColumnFiltersState,
  ColumnOrderState,
  VisibilityState,
  RowSelectionState,
  SortingState,
  Table,
} from '@tanstack/react-table'
import { LooseEntity } from '@/models/config'

export type AccessorKeys = Record<string, string>
export type GraphedFields = string[]

export interface TableContextProps {
  table?: Table<LooseEntity>
  setTable: Dispatch<SetStateAction<Table<LooseEntity> | undefined>>
  isReadyToRender: boolean

  states: {
    columnVisibility: VisibilityState
    setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>

    columnFilters: ColumnFiltersState
    setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>

    columnOrder: ColumnOrderState
    setColumnOrder: Dispatch<SetStateAction<ColumnOrderState>>

    rowSelection: RowSelectionState
    setRowSelection: Dispatch<SetStateAction<RowSelectionState>>
    selectedRowIds: number[]
    deselectRows: () => void

    sorting: SortingState
    setSorting: Dispatch<SetStateAction<SortingState>>

    accessorKeys: AccessorKeys
    setAccessorKeys: Dispatch<SetStateAction<AccessorKeys>>

    graphedFields: GraphedFields
    setGraphedFields: Dispatch<SetStateAction<GraphedFields>>
    toggleGraphedField: (field: string) => void
  }
}

export const TableContext = createContext<TableContextProps | undefined>(
  undefined,
)
