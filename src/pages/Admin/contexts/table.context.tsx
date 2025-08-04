import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
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
import { LooseEntity } from '@/models/config'

export type AccessorKeys = Record<string, string>

interface TableContextProps {
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
  }
}

export const TableContext = createContext<TableContextProps | undefined>(
  undefined,
)

interface TableProviderProps {
  children: ReactNode
}

export const TableProvider = ({ children }: TableProviderProps) => {
  const [table, setTable] = useState<Table<LooseEntity>>()

  const isReadyToRender = useMemo<TableContextProps['isReadyToRender']>(
    () => table !== undefined,
    [table],
  )

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const selectedRowIds = useMemo<TableContextProps['states']['selectedRowIds']>(
    () =>
      Object.keys(rowSelection)
        .filter(id => rowSelection[id])
        .map(Number),
    [rowSelection],
  )

  const deselectRows = useCallback<TableContextProps['states']['deselectRows']>(
    () => setRowSelection({}),
    [],
  )

  const [sorting, setSorting] = useState<SortingState>([])

  const [accessorKeys, setAccessorKeys] = useState<AccessorKeys>({})

  return (
    <TableContext.Provider
      value={{
        table,
        setTable,
        isReadyToRender,

        states: {
          columnVisibility,
          setColumnVisibility,

          columnFilters,
          setColumnFilters,

          columnOrder,
          setColumnOrder,

          rowSelection,
          setRowSelection,
          selectedRowIds,
          deselectRows,

          sorting,
          setSorting,

          accessorKeys,
          setAccessorKeys,
        },
      }}
    >
      {children}
    </TableContext.Provider>
  )
}
