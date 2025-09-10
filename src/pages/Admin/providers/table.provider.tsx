import { ReactNode, useCallback, useMemo, useState } from 'react'
import {
  ColumnFiltersState,
  ColumnOrderState,
  VisibilityState,
  RowSelectionState,
  SortingState,
  Table,
} from '@tanstack/react-table'
import { LooseEntity } from '@/models/config'
import {
  AccessorKeys,
  GraphedFields,
  TableContext,
  TableContextProps,
} from '../contexts/table.context'

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

  const [graphedFields, setGraphedFields] = useState<GraphedFields>([])

  const toggleGraphedField = useCallback<
    TableContextProps['states']['toggleGraphedField']
  >(
    field =>
      setGraphedFields(prev =>
        prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field],
      ),
    [graphedFields],
  )

  const reset = useCallback(() => {
    setColumnVisibility({})
    setColumnFilters([])
    setColumnOrder([])
    setRowSelection({})
    setSorting([])
    setAccessorKeys({})
    setGraphedFields([])
  }, [])

  return (
    <TableContext.Provider
      value={{
        table,
        setTable,
        isReadyToRender,
        reset,

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

          graphedFields,
          setGraphedFields,
          toggleGraphedField,
        },
      }}
    >
      {children}
    </TableContext.Provider>
  )
}
