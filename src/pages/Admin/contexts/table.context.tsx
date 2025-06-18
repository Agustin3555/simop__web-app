import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'
import {
  ColumnFiltersState,
  ColumnOrderState,
  VisibilityState,
  RowSelectionState,
  SortingState,
  Table,
} from '@tanstack/react-table'
import { GeneralEntity } from '@/models/config'

interface TableContextProps {
  table?: Table<GeneralEntity>
  setTable: (table: Table<GeneralEntity>) => void

  columnVisibility: {
    state: VisibilityState
    setState: Dispatch<SetStateAction<VisibilityState>>
  }
  columnFilters: {
    state: ColumnFiltersState
    setState: Dispatch<SetStateAction<ColumnFiltersState>>
  }
  columnOrder: {
    state: ColumnOrderState
    setState: Dispatch<SetStateAction<ColumnOrderState>>
  }
  rowSelection: {
    state: RowSelectionState
    setState: Dispatch<SetStateAction<RowSelectionState>>
  }
  sorting: {
    state: SortingState
    setState: Dispatch<SetStateAction<SortingState>>
  }
}

export const TableContext = createContext<TableContextProps | undefined>(
  undefined,
)

interface TableProviderProps {
  children: ReactNode
}

export const TableProvider = ({ children }: TableProviderProps) => {
  const [table, setTable] = useState<TableContextProps['table']>()

  const [columnVisibility, setColumnVisibility] = useState<
    TableContextProps['columnVisibility']['state']
  >({})
  const [columnFilters, setColumnFilters] = useState<
    TableContextProps['columnFilters']['state']
  >([])
  const [columnOrder, setColumnOrder] = useState<
    TableContextProps['columnOrder']['state']
  >([])
  const [rowSelection, setRowSelection] = useState<
    TableContextProps['rowSelection']['state']
  >({})
  const [sorting, setSorting] = useState<TableContextProps['sorting']['state']>(
    [],
  )

  return (
    <TableContext.Provider
      value={{
        table,
        setTable,

        columnVisibility: {
          state: columnVisibility,
          setState: setColumnVisibility,
        },
        columnFilters: {
          state: columnFilters,
          setState: setColumnFilters,
        },
        columnOrder: {
          state: columnOrder,
          setState: setColumnOrder,
        },
        rowSelection: {
          state: rowSelection,
          setState: setRowSelection,
        },
        sorting: {
          state: sorting,
          setState: setSorting,
        },
      }}
    >
      {children}
    </TableContext.Provider>
  )
}
