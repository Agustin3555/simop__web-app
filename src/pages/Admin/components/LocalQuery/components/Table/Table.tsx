import './Table.css'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useScheme } from '@/pages/Admin/hooks'
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
  ColumnOrderState,
} from '@tanstack/react-table'
import { Cell, Header, RowSelectorCell } from './components'
import { Entity } from '@/services/config'

interface TableProps {
  data: Entity[]
  rowSelection: RowSelectionState
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>
  selectedRowIds: number[]
}

const SELECT_COLUMN = 'select'

const Table = ({
  data,
  rowSelection,
  setRowSelection,
  selectedRowIds,
}: TableProps) => {
  const { scheme, flatProps } = useScheme()
  const { groups } = scheme

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    // Inicializar el orden de columnas
    [SELECT_COLUMN, ...groups.flatMap(({ props }) => Object.keys(props))],
  )

  const columns = useMemo(
    () => [
      { id: SELECT_COLUMN },
      ...groups.flatMap<ColumnDef<Entity>>(({ props }) =>
        Object.values(props).map(({ key, accessorFn, filterFn }) => ({
          header: key,
          accessorKey: key,
          id: key,
          ...(accessorFn && { accessorFn }),
          ...(filterFn && { filterFn }),
        })),
      ),
    ],
    [],
  )

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection, columnFilters, sorting, columnOrder },
    getRowId: row => String(row.id),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
    enableMultiSort: true,
    enableSortingRemoval: false,
  })

  return (
    <div className="cmp-table">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header =>
                header.id === SELECT_COLUMN ? (
                  <RowSelectorCell
                    key={header.id}
                    checked={table.getIsAllRowsSelected()}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                    asHeader
                    selectionCounter={selectedRowIds.length}
                  />
                ) : (
                  <Header
                    key={header.id}
                    {...{
                      flatProps,
                      header,
                      sorting,
                      setSorting,
                      columnOrder,
                      setColumnOrder,
                    }}
                  />
                ),
              )}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row
                .getVisibleCells()
                .map(cell =>
                  cell.column.columnDef.id === SELECT_COLUMN ? (
                    <RowSelectorCell
                      key={cell.id}
                      checked={row.getIsSelected()}
                      disabled={!row.getCanSelect()}
                      indeterminate={row.getIsSomeSelected()}
                      onChange={row.getToggleSelectedHandler()}
                    />
                  ) : (
                    <Cell key={cell.id} {...{ flatProps, cell }} />
                  ),
                )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
