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
import { CellRef, CellRefProps } from './components'
import { Ref } from '../../types'

type Format = 'dateTime'

interface Extension<T> {
  accessorKey: keyof T
  format?: Format
  ref?: {
    provider: Pick<CellRefProps, 'provider'>
    field: string
  }
}

interface Props<T> {
  provider: () => Promise<T[] | AppError>
  columns: (ColumnDef<T> & Extension<T>)[]
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
      originalColumns.map(({ format, ref, ...rest }) => ({
        ...rest,
        ...(format && {
          cell: formatMatcher.current[format],
        }),
        ...(ref && {
          header: () => (
            <div>
              {rest.header as string}
              <small>{ref.field}</small>
            </div>
          ),
          cell: (info: CellContext<T, Ref>) => {
            const value = info.getValue()
            return value && <CellRef value={value.title} {...ref} />
          },
        }),
      })),
    [originalColumns]
  )

  const table = useReactTable({
    data,
    columns,
    // TODO: quizás no se utilice en el futuro ya que controlaremos el renderizado
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
      <div className="table-container">
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
                      {/* TODO: Crear un componente Cell y envolver lo siguiente */}
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
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
