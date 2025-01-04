import './Table.css'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
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
} from '@tanstack/react-table'
import { Cell, Header, RowSelectorCell } from './components'
import { Entity } from '@/services/config'

interface TableProps {
  data: Entity[]
  selectedRowIds: number[]
  setSelectedRowIds: Dispatch<SetStateAction<number[]>>
}

const SELECT_COLUMN = 'select'

const Table = ({ data, selectedRowIds, setSelectedRowIds }: TableProps) => {
  const { scheme, flatProps } = useScheme()
  const { groups } = scheme

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sortState, setSortState] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  useEffect(() => {
    setSelectedRowIds(
      Object.keys(rowSelection)
        .filter(id => rowSelection[id])
        .map(Number),
    )
  }, [rowSelection])

  const columns = useMemo(
    () => [
      { id: SELECT_COLUMN },
      ...groups.flatMap<ColumnDef<Entity>>(({ props }) =>
        Object.values(props).map(({ key, accessorFn, filterFn }) => ({
          header: key,
          accessorKey: key,
          accessorFn,
          ...filterFn,
        })),
      ),
    ],
    [],
  )

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection, columnFilters, sorting: sortState },
    getRowId: row => String(row.id),

    onRowSelectionChange: setRowSelection,
    onSortingChange: setSortState,
    onColumnFiltersChange: setColumnFilters,

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
