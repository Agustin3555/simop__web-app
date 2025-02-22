import { Entity } from '@/services/config'
import { ForView, PropScheme, Required } from './utils'
import { Input } from '@/components'
import { BuiltInFilterFn, Column, Row } from '@tanstack/react-table'
import { NumberFilter } from '../../components'

export class NumberProp implements PropScheme {
  key = ''

  constructor(
    public title: string,

    public config?: {
      decimal?: boolean
      big?: boolean
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
    const { field, decimal = false } = config ?? {}
    const { hidden, required } = field ?? {}

    if (hidden === true) return

    return (
      <Input
        key={key}
        name={key}
        type="number"
        {...{ title, required }}
        step={decimal ? '0.01' : undefined}
      />
    )
  }

  getFieldValue = (formData: FormData) => {
    const { key, config } = this
    const { field, big = false } = config ?? {}
    const { hidden } = field ?? {}

    if (hidden === true) return

    const value = formData.get(key)

    if (value === '') return

    return big ? value : Number(value)
  }

  filterFn: BuiltInFilterFn = 'inNumberRange'

  getHeader = (column: Column<Entity>) => {
    const { title, config } = this
    const { decimal = false } = config ?? {}
    const { getFilterValue, setFilterValue, getFacetedMinMaxValues } = column

    const filter = (
      <NumberFilter
        {...{ decimal, getFilterValue, setFilterValue, getFacetedMinMaxValues }}
      />
    )

    return { title, filter }
  }

  getCellComponent = (row: Row<Entity>) => {
    const { key, config } = this
    const { pre, sub } = config ?? {}

    const value = row.original[key] as number | string

    return (
      value && (
        <p>
          {pre && <small className="pre">{pre}</small>}
          {value}
          {sub && <small className="sub">{sub}</small>}
        </p>
      )
    )
  }
}
