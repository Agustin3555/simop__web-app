import { ForView, MinSize, PropFactory, IRequired, BaseProp } from './utils'
import { Input } from '@/components'
import { format } from '@formkit/tempo'
import { DateTimeFilter } from '../components'

interface DateProp extends BaseProp {
  config?: {
    withTime?: boolean

    field?: ForView & IRequired
  }
}

export const createDateProp =
  ({ title, minSize, config }: DateProp): PropFactory =>
  key => {
    const { withTime = false, field } = config ?? {}
    const { hidden, required } = field ?? {}

    return {
      key,
      title,
      minSize: minSize ?? withTime ? MinSize.s : MinSize.xs,

      getFormField: (value, editMode = false) => {
        if (hidden === true) return

        value = withTime
          ? new Date(value).toISOString().slice(0, 16)
          : value.split('T')[0]

        return (
          <Input
            keyName={key}
            {...(!editMode && { required })}
            {...{ title, value, editMode }}
            inputHTMLAttrs={{
              type: withTime ? 'datetime-local' : 'date',
              min: withTime ? '1900-01-01T00:00' : '1900-01-01',
            }}
          />
        )
      },

      getFormFieldValue: (formData, _, editMode = false) => {
        const value = formData.get(key) as null | string

        if (value === null) return
        if (value === '') return editMode ? null : undefined

        return value + withTime ? ':00Z' : 'T00:00:00Z'
      },

      filterFn: (row, columnId, filterValue) => {
        if (!filterValue) return true // No hay filtro, muestra todo

        const { min, max } = filterValue
        const rowDate = new Date(row.getValue(columnId))

        const isAfterMin = min ? rowDate >= new Date(min) : true
        const isBeforeMax = max ? rowDate <= new Date(max) : true

        return isAfterMin && isBeforeMax
      },

      getTableHeader: column => {
        const { setFilterValue } = column

        return {
          title,
          getFilter: ({ getFilterValue }) => (
            <DateTimeFilter {...{ withTime, getFilterValue, setFilterValue }} />
          ),
        }
      },

      getTableCell: item => {
        const value = item[key] as undefined | string

        return (
          value && (
            <p>
              {withTime
                ? format(value, { date: 'short', time: 'short' })
                : format(value.slice(0, 10), { date: 'short' })}
            </p>
          )
        )
      },

      getExcelTableCell: item => {
        const value = item[key] as undefined | string

        if (value === undefined) return

        return withTime
          ? format(value, { date: 'short', time: 'short' })
          : format(value.slice(0, 10), { date: 'short' })
      },
    }
  }
