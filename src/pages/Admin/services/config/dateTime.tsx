import { Entity, EntityKey } from '@/services/config'
import { ForView, PropScheme, Required } from './utils'
import { FormValues } from '@/hooks'
import { Input } from '@/components'
import { Column, FilterFn, Row } from '@tanstack/react-table'
import { format } from '@formkit/tempo'
import { DateTimeFilter } from '../../components'
import { ReactNode } from 'react'

export class DateTimeProp<T extends EntityKey> implements PropScheme {
  constructor(
    public key: T,
    public title: string,

    public config?: {
      // column?: ForView,
      field?: ForView & Required
    },
  ) {}

  getFieldComponent = () => {
    const { key, title, config } = this
    const { field } = config ?? {}
    const { hidden, required } = field ?? {}

    if (hidden === true) return

    return (
      <Input
        key={key}
        name={key}
        type="datetime-local"
        {...{ title, required }}
      />
    )
  }

  getFieldValue = (formValues: FormValues) => {
    const { key, config } = this
    const { field } = config ?? {}
    const { hidden } = field ?? {}

    if (hidden === true) return

    return formValues.get.string(key)
  }

  filterFn: FilterFn<Entity> = (row, columnId, filterValue) => {
    if (!filterValue) return true // No hay filtro, muestra todo

    const { min, max } = filterValue
    const rowDate = new Date(row.getValue(columnId))

    const isAfterMin = min ? rowDate >= new Date(min) : true
    const isBeforeMax = max ? rowDate <= new Date(max) : true

    return isAfterMin && isBeforeMax
  }

  getHeader = (column: Column<Entity>) => {
    const { title } = this

    const { getFilterValue, setFilterValue } = column
    const filterValue = getFilterValue() || { min: '', max: '' }

    const filter = <DateTimeFilter {...{ filterValue, setFilterValue }} />

    return { title, filter }
  }

  getCellComponent = (row: Row<Entity>) => {
    const { key } = this

    const value = row.original[key] as string

    return <p>{format(value, { date: 'medium', time: 'short' })}</p>
  }
}