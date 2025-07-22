import { LooseEntity } from '@/models/config'
import { ForView, GetFilter, MinSize, PropScheme, Required } from './utils'
import { BuiltInFilterFn, Column } from '@tanstack/react-table'
import { InputArea, TextFilter } from '../components'

export class TextLongProp implements PropScheme {
  key = ''

  constructor(
    public title: string,

    public config?: {
      // column?: ForView,
      field?: ForView & Required
    },

    public minSize: MinSize | number = MinSize.xl,
  ) {}

  getFormField = (value?: string, editMode = false) => {
    const { key, title, config } = this
    const { field } = config ?? {}
    const { hidden, required } = field ?? {}

    if (hidden === true) return

    return (
      <InputArea
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

    const value = item[key] as string | undefined

    if (value === undefined) return

    return value
  }
}
