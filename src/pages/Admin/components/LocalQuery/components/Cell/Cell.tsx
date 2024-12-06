import './Cell.css'
import { Cell as TanstackCell } from '@tanstack/react-table'
import { Ref } from '@/pages/Admin/types'
import { format } from '@formkit/tempo'
import { useCallback } from 'react'
import { FetchRef } from './components'

// TODO: admitir booleanos

type Value = number | string | Ref | Ref[]

const Cell = ({ column, row }: TanstackCell<any, Value>) => {
  const { type, ref } = column.columnDef.meta

  /*
    No se usa 'getValue' porque se necesita tener el valor original. 'getValue'
    obtiene un valor procesado porque en la definición de las columnas se
    provee un método 'accessorFn'
  */
  const value: Value = row.original[column.id]

  const formatIfDateTime = useCallback(
    <T,>(value: T) => {
      const isDateTime =
        (type === 'date' || type === 'dateTime') && typeof value === 'string'

      return isDateTime
        ? format(value, { date: 'medium', time: 'short' })
        : value
    },
    [type],
  )

  return (
    <td className="cmp-cell">
      {Array.isArray(value) ? (
        value.map(({ id, title }) => (
          <FetchRef
            key={id}
            value={formatIfDateTime(title)}
            provider={ref.provider}
          />
        ))
      ) : typeof value === 'object' ? (
        <FetchRef
          value={formatIfDateTime(value.title)}
          provider={ref.provider}
        />
      ) : (
        formatIfDateTime(value)
      )}
    </td>
  )
}

export default Cell
