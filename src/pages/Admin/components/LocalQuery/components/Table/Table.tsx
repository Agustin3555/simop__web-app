import './Table.css'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useRowSelection, useScheme } from '@/pages/Admin/hooks'
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnOrderState,
  VisibilityState,
} from '@tanstack/react-table'
import { Cell, Header, RowSelectorCell } from './components'
import { Entity } from '@/services/config'
import { MinSize, PropScheme } from '@/pages/Admin/services/config'

export type GetHeaderResult = ReturnType<NonNullable<PropScheme['getHeader']>>

interface TableProps {
  data: Entity[]
  columnVisibility: VisibilityState
  setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>
  setQuickFilters: Dispatch<SetStateAction<GetHeaderResult[] | undefined>>
}

const SELECT_COLUMN = 'select'
const STEP_WIDTH = 32

const Table = ({
  data,
  columnVisibility,
  setColumnVisibility,
  setQuickFilters,
}: TableProps) => {
  const { scheme, flatProps } = useScheme()
  const { quickFilters, groups } = scheme

  const { rowSelection, setRowSelection, selectedRowIds } = useRowSelection()
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
        Object.values(props).map(
          ({ key, minSize, accessorFn, filterFn, footer }) => ({
            id: key,
            accessorKey: key,
            header: key,
            minSize: MinSize.xs * STEP_WIDTH,
            size: minSize * STEP_WIDTH,
            ...(accessorFn && { accessorFn }),
            ...(filterFn && { filterFn }),
            ...(footer && { footer }),
          }),
        ),
      ),
    ],
    [],
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      columnFilters,
      sorting,
      columnOrder,
      columnVisibility,
    },
    getRowId: row => String(row.id),

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),

    enableRowSelection: true,
    enableMultiSort: true,
    enableSortingRemoval: false,
    columnResizeMode: 'onEnd',
  })

  useEffect(() => {
    if (!quickFilters) return

    let results: GetHeaderResult[] = []

    quickFilters.forEach(key => {
      const { getHeader } = flatProps[key]

      if (!getHeader) return

      const { column } =
        table.getHeaderGroups()[0].headers.find(({ id }) => id === key) ?? {}

      if (!column) return

      results = [...results, getHeader(column)]
    })

    setQuickFilters(results)
  }, [])

  return (
    <div className="cmp-table">
      <div className="table stick-head">
        <div className="head">
          {table.getHeaderGroups().map(headerGroup => (
            <div className="row" key={headerGroup.id}>
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
            </div>
          ))}
        </div>
        <div className="body">
          {table.getRowModel().rows.map(row => (
            <div className="row" key={row.id}>
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
            </div>
          ))}
        </div>
        <div className="foot">
          {table.getFooterGroups().map(footerGroup => (
            <div className="row" key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <div key={header.id}>
                  {header.column.columnDef.footer
                    ? typeof header.column.columnDef.footer === 'function'
                      ? header.column.columnDef.footer(header.getContext())
                      : header.column.columnDef.footer
                    : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Table
