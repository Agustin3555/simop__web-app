import { LooseEntity } from '@/models/config'
import { ForView, GetFilter, MinSize, PropScheme, Required } from './utils'
import { Input } from '@/components'
import { BuiltInFilterFn, Column } from '@tanstack/react-table'
import { TextFilter } from '../components'

export class TextProp implements PropScheme {
  key = ''

  constructor(
    public title: string,

    public config?: {
      // column?: ForView,
      field?: ForView & Required
    },

    public minSize: MinSize | number = MinSize.m,
  ) {}

  getFormField = (value?: string, editMode = false) => {
    const { key, title, config } = this
    const { field } = config ?? {}
    const { hidden, required } = field ?? {}

    if (hidden === true) return

    return (
      <Input
        keyName={key}
        {...(!editMode && { required })}
        {...{ title, value, editMode }}
      />
    )
  }

  getFormFieldValue = (
    formData: FormData,
    _: HTMLFormElement,
    editMode = false,
  ) => {
    const { key } = this

    const value = formData.get(key)

    if (value === null) return
    if (value === '') return editMode ? null : undefined

    return (value as string).trim()
  }

  filterFn: BuiltInFilterFn = 'includesString'

  getTableHeader = (column: Column<LooseEntity>) => {
    const { title } = this

    const { getFacetedUniqueValues, setFilterValue } = column

    const getFilter: GetFilter = ({ getFilterValue }) => (
      <TextFilter
        filterValue={getFilterValue()}
        {...{ getFacetedUniqueValues, setFilterValue }}
      />
    )

    return { title, getFilter }
  }

  getTableCell = (item: LooseEntity) => {
    const { key } = this

    const value = item[key] as undefined | string

    return value && <p className="text">{value}</p>
  }

  getExcelTableCell = (item: LooseEntity) => {
    const { key } = this

    const value = item[key] as string

    return value
  }
}
