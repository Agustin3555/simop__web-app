import { GeneralEntity } from '@/models/config'
import { ForView, GetFilter, MinSize, PropScheme, Required } from './utils'
import { Input } from '@/components'
import { BuiltInFilterFn, Column, HeaderContext } from '@tanstack/react-table'
import { NumberFilter, StylizedNumber } from '../components'

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

    public minSize: MinSize | number = MinSize.xs,
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
        inputHTMLAttrs={{
          type: 'number',
          step: decimal ? '0.0001' : undefined,
        }}
      />
    )
  }

  getFieldValue = (
    formData: FormData,
    _: HTMLFormElement,
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

  footer = (info: HeaderContext<GeneralEntity, unknown>) => {
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

  getHeader = (column: Column<GeneralEntity>) => {
    const { title, config } = this
    const { decimal = false } = config ?? {}
    const { setFilterValue, getFacetedMinMaxValues } = column

    const getFilter: GetFilter = ({ getFilterValue }) => (
      <NumberFilter
        {...{ decimal, getFilterValue, setFilterValue, getFacetedMinMaxValues }}
      />
    )

    return { title, getFilter }
  }

  getValueComponent = (item: GeneralEntity) => {
    const { key, config } = this
    const { isMoney = false, pre, sub } = config ?? {}

    const value = item[key] as undefined | number | string

    if (value === undefined) return

    return <StylizedNumber {...{ value, isMoney, pre, sub }} />
  }

  getExcelValue = (item: GeneralEntity) => {
    const { key, config } = this
    const { isMoney = false, pre = '', sub = '' } = config ?? {}

    const value = item[key] as undefined | number | string

    if (value === undefined) return

    const displayValue = isMoney
      ? new Intl.NumberFormat('es-ES', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 6,
        }).format(Number(value))
      : value

    return pre + displayValue + sub
  }
}
