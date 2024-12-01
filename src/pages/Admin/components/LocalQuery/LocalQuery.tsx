import './LocalQuery.css'
import { useRef, useState } from 'react'
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
import { StateButton } from '@/components'
import { Cell, Header } from './components'
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

// TODO: crear un componente Table para que solo se llame cuando exista data

const LocalQuery = <T,>({ provider, columns }: Props<T>) => {
  const [data, setData] = useState<T[]>()
  const [columnFilters, setColumnFilters] = useState([])
  const [sortState, setSortState] = useState([])

  const tableColumns = useRef<ColumnDef<T>[]>(
    columns.map(({ header, key, type, ref }) => ({
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
    }))
  )

  const table = useReactTable({
    data,
    columns: tableColumns.current,
    state: { columnFilters, sorting: sortState },
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
        {data && <div>{data.length}</div>}
      </header>
      <div className="table-container">
        {data && (
          <table>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <Header
                      key={header.id}
                      {...header}
                      {...{ sortState, setSortState }}
                    />
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <Cell key={cell.id} {...cell} />
                  ))}
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
