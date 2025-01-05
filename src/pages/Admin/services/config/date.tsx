import { Entity, EntityKey } from '@/services/config'
import { ForView, PropScheme, Required } from './utils'
import { FormValues } from '@/hooks'
import { Input } from '@/components'
import { Column, FilterFn, Row } from '@tanstack/react-table'
import { format } from '@formkit/tempo'
import { DateTimeFilter } from '../../components'

export class DateProp<T extends EntityKey> implements PropScheme {
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

    return <Input key={key} name={key} type="date" {...{ title, required }} />
  }

  getFieldValue = (formValues: FormValues) => {
    const { key, config } = this
    const { field } = config ?? {}
    const { hidden } = field ?? {}

    if (hidden === true) return

    return formValues.get.string(key)
  }

  filterFn: FilterFn<Entity> = (row, columnId, filterValue) => {
    if (!Array.isArray(filterValue) || filterValue.length !== 2) return true

    const rowDate = new Date(row.getValue(columnId))
    const [minDate, maxDate] = filterValue.map(date => new Date(date))

    return rowDate >= minDate && rowDate <= maxDate
  }

  getHeader = (column: Column<Entity>) => {
    const { title } = this

    const { getFilterValue, setFilterValue } = column
    const filterValue = getFilterValue() || { min: '', max: '' }

    const filter = (
      <DateTimeFilter {...{ filterValue, setFilterValue }} notTime />
    )

    return { title, filter }
  }

  getCellComponent = (row: Row<Entity>) => {
    const { key } = this

    const value = row.original[key] as string

    return <p>{format(value, { date: 'medium' })}</p>
  }
}
