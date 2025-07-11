import { GeneralEntity } from '@/models/config'
import { ForView, GetFilter, MinSize, PropScheme, Required } from './utils'
import { Input } from '@/components'
import { Column, FilterFn } from '@tanstack/react-table'
import { format } from '@formkit/tempo'
import { DateTimeFilter } from '../components'

export class DateTimeProp implements PropScheme {
  key = ''

  constructor(
    public title: string,

    public config?: {
      // column?: ForView,
      field?: ForView & Required
    },

    public minSize: MinSize | number = MinSize.s,
  ) {}

  getFieldComponent = (value?: string, editMode = false) => {
    const { key, title, config } = this
    const { field } = config ?? {}
    const { hidden, required } = field ?? {}

    if (hidden === true) return

    // Convierte a un formato compatible con datetime-local
    if (value) value = new Date(value).toISOString().slice(0, 16)

    return (
      <Input
        keyName={key}
        {...(!editMode && { required })}
        {...{ title, value, editMode }}
        inputHTMLAttrs={{ type: 'datetime-local', min: '1900-01-01T00:00' }}
      />
    )
  }

  getFieldValue = (
    formData: FormData,
    _: HTMLFormElement,
    editMode = false,
  ) => {
    const { key } = this

    const value = formData.get(key) as null | string

    if (value === null) return
    if (value === '') return editMode ? null : undefined

    return value + ':00Z'
  }

  filterFn: FilterFn<GeneralEntity> = (row, columnId, filterValue) => {
    if (!filterValue) return true // No hay filtro, muestra todo

    const { min, max } = filterValue
    const rowDate = new Date(row.getValue(columnId))

    const isAfterMin = min ? rowDate >= new Date(min) : true
    const isBeforeMax = max ? rowDate <= new Date(max) : true

    return isAfterMin && isBeforeMax
  }

  getHeader = (column: Column<GeneralEntity>) => {
    const { title } = this

    const { setFilterValue } = column

    const getFilter: GetFilter = ({ getFilterValue }) => (
      <DateTimeFilter {...{ getFilterValue, setFilterValue }} />
    )

    return { title, getFilter }
  }

  getValueComponent = (item: GeneralEntity) => {
    const { key } = this

    const value = item[key] as undefined | string

    return value && <p>{format(value, { date: 'short', time: 'short' })}</p>
  }

  getExcelValue = (item: GeneralEntity) => {
    const { key } = this

    const value = item[key] as string | undefined

    if (value === undefined) return

    return format(value, { date: 'short', time: 'short' })
  }
}
