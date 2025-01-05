import { Entity, EntityKey } from '@/services/config'
import { ForView, PropScheme, Required } from './utils'
import { FormValues } from '@/hooks'
import { Input } from '@/components'
import { Column, FilterFn, Row } from '@tanstack/react-table'
import { NumberFilter } from '../../components'

export class NumberProp<T extends EntityKey> implements PropScheme {
  constructor(
    public key: T,
    public title: string,

    public config?: {
      pre?: string
      sub?: string

      // column?: ForView,
      field?: ForView &
        Required & {
          min?: number
          max?: number
        }
    },
  ) {}

  getFieldComponent = () => {
    const { key, title, config } = this
    const { field } = config ?? {}
    const { hidden, required } = field ?? {}

    if (hidden === true) return

    return <Input key={key} name={key} type="number" {...{ title, required }} />
  }

  getFieldValue = (formValues: FormValues) => {
    const { key, config } = this
    const { field } = config ?? {}
    const { hidden } = field ?? {}

    if (hidden === true) return

    return formValues.get.number(key)
  }

  getHeader = (column: Column<Entity>) => {
    const { title } = this

    const { getFacetedMinMaxValues, getFilterValue, setFilterValue } = column
    const filterValue = getFilterValue()

    const filter = (
      <NumberFilter
        {...{ filterValue, getFacetedMinMaxValues, setFilterValue }}
      />
    )

    return { title, filter }
  }

  getCellComponent = (row: Row<Entity>) => {
    const { key, config } = this
    const { pre, sub } = config ?? {}

    const value = row.original[key] as number

    return (
      <p>
        {pre && <small>{pre}</small>}
        {value}
        {sub && <small>{sub}</small>}
      </p>
    )
  }
}
