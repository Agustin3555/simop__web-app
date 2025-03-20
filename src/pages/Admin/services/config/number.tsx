import { Entity } from '@/services/config'
import { ForView, PropScheme, Required } from './utils'
import { Input } from '@/components'
import {
  BuiltInFilterFn,
  Column,
  HeaderContext,
  Row,
} from '@tanstack/react-table'
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

  getFieldComponent = (value?: number | string, editMode = false) => {
    const { key, title, config } = this
    const { field, decimal = false } = config ?? {}
    const { hidden, required } = field ?? {}

    if (hidden === true) return

    return (
      <Input
        keyName={key}
        {...(!editMode && { required })}
        {...{ title, value, editMode }}
        inputHTMLAttrs={{ type: 'number', step: decimal ? '0.01' : undefined }}
      />
    )
  }

  getFieldValue = (
    formData: FormData,
    form: HTMLFormElement,
    editMode = false,
  ) => {
    const { key, config } = this
    const { big = false } = config ?? {}

    const value = formData.get(key)

    if (value === null) return
    if (value === '') return editMode ? null : undefined

    return big ? value : Number(value)
  }

  filterFn: BuiltInFilterFn = 'inNumberRange'

  footer = (info: HeaderContext<Entity, unknown>) => {
    const { key } = this

    const total = info.table.getRowModel().rows.reduce((acc, row) => {
      const value = row.original[key] as undefined | number | string

      if (value === undefined) return acc

      const number = typeof value === 'string' ? Number(value) : value

      return acc + number
    }, 0)

    return (
      <p>
        {total.toLocaleString('es-ES', {
          minimumFractionDigits: 2,
        })}
      </p>
    )
  }

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
    const { decimal = false, pre, sub } = config ?? {}

    const value = row.original[key] as undefined | number | string

    return (
      value !== undefined && (
        <p>
          {pre && <small className="pre">{pre}</small>}
          {decimal
            ? Number(value).toLocaleString('es-ES', {
                minimumFractionDigits: 2,
              })
            : value}
          {sub && <small className="sub">{sub}</small>}
        </p>
      )
    )
  }
}
