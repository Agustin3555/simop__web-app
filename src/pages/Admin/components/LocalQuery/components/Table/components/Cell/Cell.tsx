import './Cell.css'
import { Cell as TanstackCell } from '@tanstack/react-table'
import { format } from '@formkit/tempo'
import { useCallback } from 'react'
import { FetchRef } from './components'
import { Value } from '../../../../types'

// TODO: admitir booleanos

const Cell = <T,>({ column, row }: TanstackCell<T, unknown>) => {
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
        <div className="items">
          {value.map(({ id, title }) => (
            <FetchRef
              key={id}
              id={id}
              value={formatIfDateTime(title)}
              getOneProvider={ref.getOneProvider}
            />
          ))}
        </div>
      ) : typeof value === 'object' ? (
        <FetchRef
          id={value.id}
          value={formatIfDateTime(value.title)}
          getOneProvider={ref.getOneProvider}
        />
      ) : (
        formatIfDateTime(value)
      )}
    </td>
  )
}

export default Cell
