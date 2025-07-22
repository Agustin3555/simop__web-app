import { LooseEntity } from '@/models/config'
import { ForView, GetFilter, MinSize, PropScheme, Required } from './utils'
import { Input } from '@/components'
import { Column, FilterFn } from '@tanstack/react-table'
import { format } from '@formkit/tempo'
import { DateTimeFilter } from '../components'

export class DateProp implements PropScheme {
  key = ''

  constructor(
    public title: string,

    public config?: {
      // column?: ForView,
      field?: ForView & Required
    },

    public minSize: MinSize | number = MinSize.xs,
  ) {}

  getFormField = (value?: string, editMode = false) => {
    const { key, title, config } = this
    const { field } = config ?? {}
    const { hidden, required } = field ?? {}

    if (hidden === true) return

    // Obtiene solo la fecha
    if (value) value = value.split('T')[0]

    return (
      <Input
        keyName={key}
        {...(!editMode && { required })}
        {...{ title, value, editMode }}
        inputHTMLAttrs={{ type: 'date', min: '1900-01-01' }}
      />
    )
  }

  getFormFieldValue = (
    formData: FormData,
    _: HTMLFormElement,
    editMode = false,
  ) => {
    const { key } = this

    const value = formData.get(key) as null | string

    if (value === null) return
    if (value === '') return editMode ? null : undefined

    return value + 'T00:00:00Z'
  }

  filterFn: FilterFn<LooseEntity> = (row, columnId, filterValue) => {
    if (!filterValue) return true // No hay filtro, muestra todo

    const { min, max } = filterValue
    const rowDate = new Date(row.getValue(columnId))

    const isAfterMin = min ? rowDate >= new Date(min) : true
    const isBeforeMax = max ? rowDate <= new Date(max) : true

    return isAfterMin && isBeforeMax
  }

  getTableHeader = (column: Column<LooseEntity>) => {
    const { title } = this

    const { setFilterValue } = column

    const getFilter: GetFilter = ({ getFilterValue }) => (
      <DateTimeFilter {...{ getFilterValue, setFilterValue }} notTime />
    )

    return { title, getFilter }
  }

  getTableCell = (item: LooseEntity) => {
    const { key } = this

    const value = item[key] as undefined | string

    return value && <p>{format(value.slice(0, 10), { date: 'short' })}</p>
  }

  getExcelTableCell = (item: LooseEntity) => {
    const { key } = this

    const value = item[key] as string | undefined

    if (value === undefined) return

    return format(value.slice(0, 10), { date: 'short' })
  }
}
