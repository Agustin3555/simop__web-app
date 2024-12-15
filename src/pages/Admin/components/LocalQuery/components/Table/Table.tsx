import './Table.css'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import {
  ColumnDef,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  RowData,
  useReactTable,
} from '@tanstack/react-table'
import { Cell, Header, RowSelectorCell } from './components'
import { Columns, Meta } from '../../types'
import { Ref } from '@/types'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> extends Meta {}
}

interface TableProps<T> {
  data: T[]
  columns: Columns<T>
  selectedRowIds: number[]
  setSelectedRowIds: Dispatch<SetStateAction<number[]>>
}

const SELECT_COLUMN = 'select'

const Table = <T extends { id: number }>({
  data,
  columns,
  selectedRowIds,
  setSelectedRowIds,
}: TableProps<T>) => {
  const [columnFilters, setColumnFilters] = useState([])
  const [sortState, setSortState] = useState([])
  const [rowSelection, setRowSelection] = useState({})

  useEffect(() => {
    setSelectedRowIds(
      Object.keys(rowSelection)
        .filter(id => rowSelection[id])
        .map(Number),
    )
  }, [rowSelection])

  const tableColumns = useMemo(
    () => [
      { id: SELECT_COLUMN },
      ...columns.map<ColumnDef<T>>(({ header, key, type, ref }) => ({
        header,
        accessorKey: key,
        meta: { type, ref },
        ...(type === 'dateTime' && {
          filterFn: (row, columnId, filterValue) => {
            if (!filterValue) return true // No hay filtro, muestra todo

            const { min, max } = filterValue
            const rowDate = new Date(row.getValue(columnId))

            const isAfterMin = min ? rowDate >= new Date(min) : true
            const isBeforeMax = max ? rowDate <= new Date(max) : true

            return isAfterMin && isBeforeMax
          },
        }),
        ...(ref && {
          accessorFn: row => {
            return (row[key] as Ref)?.title ?? ''
          },
        }),
      })),
    ],
    [columns],
  )

  const table = useReactTable({
    data,
    getRowId: row => String(row.id),
    columns: tableColumns,
    state: { rowSelection, columnFilters, sorting: sortState },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSortState,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
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
                    {...header}
                    {...{ sortState, setSortState }}
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
                    <Cell key={cell.id} {...cell} />
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
