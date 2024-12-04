import './Cell.css'
import { useMemo } from 'react'
import { Cell as TanstackCell } from '@tanstack/react-table'
import { Button } from '@/components'
import { Ref } from '@/pages/Admin/types'
import { format } from '@formkit/tempo'

const Cell = ({ column, getValue }: TanstackCell<any, unknown>) => {
  const { type, ref } = column.columnDef.meta
  const rawValue = getValue()

  const value = useMemo(() => {
    if (!rawValue) return null

    if (ref && typeof rawValue === 'object') return (rawValue as Ref).title

    const isDateTime =
      (type === 'date' || type === 'dateTime') && typeof rawValue === 'string'

    if (isDateTime) return format(rawValue, { date: 'medium', time: 'short' })

    return rawValue
  }, [rawValue, type, ref])

  return (
    <td className="cmp-cell">
      {value &&
        (ref ? (
          <Button
            title={String(value)}
            faIcon="fa-solid fa-eye"
            _type="secondary"
          />
        ) : (
          String(value)
        ))}
    </td>
  )
}

export default Cell
