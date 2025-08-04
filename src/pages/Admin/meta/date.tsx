import { ForView, MinSize, PropFactory, IRequired, BaseProp } from './utils'
import { Input } from '@/components'
import { format } from '@formkit/tempo'
import { DateFilter } from '../components'
import { StyleSheet, Text } from '@react-pdf/renderer'

const formatter = (value: string, withTime: boolean) =>
  withTime
    ? format(value, { date: 'short', time: 'short' })
    : format(value.slice(0, 10), { date: 'short' })

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

      filterFn: (row, columnId, filterValue) => {
        if (!filterValue) return true

        const { min, max } = filterValue
        const rowDate = new Date(row.getValue(columnId))

        const isAfterMin = min ? rowDate >= new Date(min) : true
        const isBeforeMax = max ? rowDate <= new Date(max) : true

        return isAfterMin && isBeforeMax
      },

      getFormField: (value?: string, editMode = false) => {
        if (hidden === true) return

        if (value)
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

      getTableHeader: column => ({
        title,
        getFilter: () => <DateFilter {...{ column, withTime }} />,
      }),

      getTableCell: item => {
        const value = item[key] as undefined | string

        return value && <p>{formatter(value, withTime)}</p>
      },

      getReportTableFilter: column => {
        const { getFilterValue } = column

        const value = getFilterValue() as
          | undefined
          | { min?: string; max?: string }

        if (value === undefined) return

        const { min, max } = value

        const values = [] as string[]

        if (min !== undefined && min !== '')
          values.push(`min: ${formatter(min, withTime)}`)
        if (max !== undefined && max !== '')
          values.push(`max: ${formatter(max, withTime)}`)

        if (!values.length) return

        return { title, values }
      },

      getReportTableCell: item => {
        const value = item[key] as undefined | string

        if (value === undefined) return

        const styles = StyleSheet.create({
          value: {},
        })

        return <Text style={styles.value}>{formatter(value, withTime)}</Text>
      },

      getExcelTableCell: item => {
        const value = item[key] as undefined | string

        if (value === undefined) return

        return formatter(value, withTime)
      },
    }
  }
