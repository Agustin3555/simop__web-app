import './Cell.css'
import { Cell as TanstackCell } from '@tanstack/react-table'
import { format } from '@formkit/tempo'
import { useCallback, useMemo } from 'react'
import { FetchRef } from './components'
import { Value } from '../../../../types'

const Cell = <T,>({ column, row }: TanstackCell<T, unknown>) => {
  const { type, ref } = column.columnDef.meta ?? {}

  /*
  No se usa 'getValue' porque se necesita tener el valor original. 'getValue'
  obtiene un valor procesado porque en la definición de las columnas se
  provee un método 'accessorFn'
  */
  const value: Value = useMemo(() => row.original[column.id], [])

  const formatIfDateTime = useCallback(
    <T,>(value: T) => {
      if (type === 'date' && typeof value === 'string')
        return format(value, { date: 'medium' })

      if (type === 'dateTime' && typeof value === 'string')
        return format(value, { date: 'medium', time: 'short' })

      // TODO: hacer que se pueda pasar los textos
      if (type === 'boolean' && typeof value === 'boolean')
        return value ? 'Si' : 'No'

      return value
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
