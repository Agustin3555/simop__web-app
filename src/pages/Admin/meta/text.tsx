import { GeneralEntity } from '@/models/config'
import { ForView, GetFilter, MinSize, PropScheme, Required } from './utils'
import { Input } from '@/components'
import { Column } from '@tanstack/react-table'
import { TextFilter } from '../components'

export class TextProp implements PropScheme {
  key = ''

  constructor(
    public title: string,

    public config?: {
      // column?: ForView,
      field?: ForView & Required
    },

    public minSize = MinSize.l,
  ) {}

  getFieldComponent = (value?: string, editMode = false) => {
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

  getFieldValue = (
    formData: FormData,
    form: HTMLFormElement,
    editMode = false,
  ) => {
    const { key } = this

    const value = formData.get(key)

    if (value === null) return
    if (value === '') return editMode ? null : undefined

    return (value as string).trim()
  }

  getHeader = (column: Column<GeneralEntity>) => {
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

  getValueComponent = (item: GeneralEntity) => {
    const { key } = this

    const value = item[key] as undefined | string

    return value && <p className="text">{value}</p>
  }

  getExcelValue = (item: GeneralEntity) => {
    const { key } = this

    const value = item[key] as string

    return value
  }
}
