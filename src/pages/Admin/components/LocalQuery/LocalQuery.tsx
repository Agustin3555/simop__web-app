import './LocalQuery.css'
import { useMemo, useRef, useState } from 'react'
import { useHandleAction } from '@/hooks'
import {
  CellContext,
  ColumnDef,
  ColumnDefTemplate,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { StateButton } from '@/components'
import { AppError } from '@/services/config'
import { format as tempoFormat } from '@formkit/tempo'

type Format = 'dateTime'

interface Extension {
  format?: Format
}

interface Props<T> {
  provider: () => Promise<T[] | AppError>
  columns: (ColumnDef<T> & Extension)[]
}

const LocalQuery = <T,>({ provider, columns: originalColumns }: Props<T>) => {
  const [data, setData] = useState<T[]>()

  const formatMatcher = useRef<
    Record<Format, ColumnDefTemplate<CellContext<T, unknown>>>
  >({
    dateTime: info =>
      tempoFormat(info.getValue() as string, {
        date: 'medium',
        time: 'short',
      }),
  })

  const columns = useMemo<ColumnDef<T>[]>(
    () =>
      originalColumns.map(({ format, ...rest }) => {
        const cell = format && formatMatcher.current[format]

        return {
          ...(cell && { cell }),
          ...rest,
        }
      }),
    [originalColumns]
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleActionResult = useHandleAction(
    async ({ setError, setSuccess }) => {
      const response = await provider()

      if (!response || response instanceof AppError) {
        await setError()
      } else {
        setData(response)

        await setSuccess()
      }
    }
  )

  return (
    <div className="cmp-local-query">
      <header>
        <StateButton
          title="Consultar los datos"
          faIcon="fa-solid fa-cloud-arrow-down"
          {...handleActionResult}
        />
        {data && <div>{data.length}</div>}
      </header>
      {data && (
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default LocalQuery
