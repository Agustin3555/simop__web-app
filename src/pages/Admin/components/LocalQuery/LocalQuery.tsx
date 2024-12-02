import './LocalQuery.css'
import { useMemo, useState } from 'react'
import { useHandleAction } from '@/hooks'
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
import { Icon, StateButton } from '@/components'
import { Cell, Header, RowSelectorCell } from './components'
import { Ref } from '../../types'

export type TypeMeta = 'text' | 'number' | 'date' | 'dateTime' | 'option'

interface Meta {
  type: TypeMeta
  ref?: {
    field: string
    provider: (id: number) => Promise<unknown>
  }
}

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> extends Meta {}
}

interface Column<T> extends Meta {
  key: keyof T
  header: string
}

interface Props<T> {
  provider: () => Promise<T[]>
  columns: Column<T>[]
}

const SELECT_COLUMN = 'select'

// TODO: crear un componente Table para que solo se llame cuando exista data

const LocalQuery = <T extends { id: number }>({
  provider,
  columns,
}: Props<T>) => {
  const [data, setData] = useState<T[]>()
  const [columnFilters, setColumnFilters] = useState([])
  const [sortState, setSortState] = useState([])
  const [rowSelection, setRowSelection] = useState({})

  const selectedRowIds = Object.keys(rowSelection)
    .filter(id => rowSelection[id])
    .map(Number)

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
    [columns]
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

  const handleActionResult = useHandleAction(
    async ({ setError, setSuccess }) => {
      try {
        const response = await provider()
        setData(response)

        await setSuccess()
      } catch (error) {
        await setError()
      }
    }
  )

  return (
    <div className="cmp-local-query">
      <header>
        <StateButton
          text="Traer los datos"
          hiddenText
          faIcon="fa-solid fa-cloud-arrow-down"
          {...handleActionResult}
        />
        {data && (
          <div className="total-items">
            <Icon faIcon="fa-solid fa-cubes-stacked" />
            <p>{data.length}</p>
          </div>
        )}
      </header>
      <div className="table-container">
        {data && (
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
                    )
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
                      )
                    )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default LocalQuery
