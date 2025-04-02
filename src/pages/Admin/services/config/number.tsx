import { Entity } from '@/services/config'
import { ForView, MinSize, PropScheme, Required } from './utils'
import { Input } from '@/components'
import {
  BuiltInFilterFn,
  Column,
  HeaderContext,
  Row,
} from '@tanstack/react-table'
import { NumberFilter, StylizedNumber } from '../../components'

export class NumberProp implements PropScheme {
  key = ''

  constructor(
    public title: string,

    public config?: {
      decimal?: boolean
      isMoney?: boolean
      big?: boolean
      sum?: boolean
      pre?: string
      sub?: string

      // column?: ForView,
      field?: ForView &
        Required & {
          min?: number
          max?: number
        }
    },

    public minSize = MinSize.xs,
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
    const { key, config } = this
    const { isMoney = false, sum = false, pre, sub } = config ?? {}

    if (!sum) return

    const total = info.table.getRowModel().rows.reduce((acc, row) => {
      const value = row.original[key] as undefined | number | string

      if (value === undefined) return acc

      const number = typeof value === 'string' ? Number(value) : value

      return acc + number
    }, 0)

    return <StylizedNumber value={total} {...{ isMoney, pre, sub }} />
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
    const { isMoney = false, pre, sub } = config ?? {}

    let value = row.original[key] as undefined | number | string

    if (typeof value === 'string') value = Number(value)

    return (
      value !== undefined && (
        <StylizedNumber {...{ value, isMoney, pre, sub }} />
      )
    )
  }

  getExcelValue = (item: Entity) => {
    const { key, config } = this
    const { isMoney = false, pre = '', sub = '' } = config ?? {}

    let value = item[key] as undefined | number | string

    if (value === undefined) return

    if (typeof value === 'string') value = Number(value)

    return (
      pre +
      (isMoney
        ? value.toLocaleString('es-ES', { minimumFractionDigits: 2 })
        : value) +
      sub
    )
  }
}
