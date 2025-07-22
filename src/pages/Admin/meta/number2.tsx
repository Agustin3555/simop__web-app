import { LooseEntity } from '@/models/config'
import { MinSize, PropScheme } from './utils'
import { Input } from '@/components'
import {
  BuiltInFilterFn,
  Column as TsColumn,
  HeaderContext,
  Row,
} from '@tanstack/react-table'
import { NumberFilter, StylizedNumber } from '../components'

interface Base {
  title: { long: string; short?: string }
  desc?: string
}

interface Global {
  isDecimal: boolean
  isMoney: boolean
  isBig: boolean
  pre?: string
  sub?: string
}

interface Field {
  hidden: boolean
  required: boolean
  min?: number
  max?: number
}

interface Column {
  hidden: boolean
  width: MinSize
  calculate?: 'sum' | 'average'
}

export class NumberProp implements PropScheme {
  key = ''
  title: Base['title']
  desc: Base['desc']

  global: Global
  field: Field
  column: Column

  constructor({
    global,
    field,
    column,
    ...rest
  }: {
    title: Base['title']
    desc: Base['desc']

    global?: Partial<Global>
    field?: Partial<Field>
    column?: Partial<Column>
  }) {
    this.title = rest.title
    this.desc = rest.desc

    this.global = {
      isDecimal: false,
      isMoney: false,
      isBig: false,
      ...global,
    }
    this.field = {
      hidden: false,
      required: false,
      ...field,
    }
    this.column = {
      hidden: true,
      width: MinSize.xs,
      ...column,
    }
  }

  getFormField = (value?: number | string, editMode = false) => {
    const { key, title, global, field } = this
    const { isDecimal } = global
    const { hidden, required } = field

    if (hidden === true) return

    return (
      <Input
        keyName={key}
        title={title.long}
        {...(!editMode && { required })}
        {...{ value, editMode }}
        inputHTMLAttrs={{
          type: 'number',
          step: isDecimal ? '0.000001' : undefined,
        }}
      />
    )
  }

  getFormFieldValue = (
    formData: FormData,
    form: HTMLFormElement,
    editMode = false,
  ) => {
    const { key, global } = this
    const { isBig } = global

    const value = formData.get(key)

    if (value === null) return
    if (value === '') return editMode ? null : undefined

    return isBig ? value : Number(value)
  }

  filterFn: BuiltInFilterFn = 'inNumberRange'

  footer = (info: HeaderContext<LooseEntity, unknown>) => {
    const { key, global, column } = this
    const { isMoney, pre, sub } = global
    const { calculate } = column

    if (calculate === 'sum') {
      const total = info.table.getRowModel().rows.reduce((acc, row) => {
        const value = row.original[key] as undefined | number | string

        if (value === undefined) return acc

        const number = typeof value === 'string' ? Number(value) : value

        return acc + number
      }, 0)

      return <StylizedNumber value={total} {...{ isMoney, pre, sub }} />
    }
  }

  getTableHeader = (column: TsColumn<LooseEntity>) => {
    const { title, global } = this
    const { isDecimal } = global
    const { getFilterValue, setFilterValue, getFacetedMinMaxValues } = column

    const filter = (
      <NumberFilter
        decimal={isDecimal}
        {...{ getFilterValue, setFilterValue, getFacetedMinMaxValues }}
      />
    )

    return { title: title.short ?? title.long, filter }
  }

  getTableCell = (row: Row<LooseEntity>) => {
    const { key, global } = this
    const { isMoney, pre, sub } = global

    let value = row.original[key] as undefined | number | string

    if (typeof value === 'string') value = Number(value)

    return (
      value !== undefined && (
        <StylizedNumber {...{ value, isMoney, pre, sub }} />
      )
    )
  }

  getExcelTableCell = (item: LooseEntity) => {
    const { key, global } = this
    const { isMoney, pre = '', sub = '' } = global

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
