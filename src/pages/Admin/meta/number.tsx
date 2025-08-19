import {
  ForView,
  MinSize,
  PropFactory,
  IRequired,
  BaseProp,
  createUniqueMode,
  WDND_MODE,
} from './utils'
import { Input } from '@/components'
import { NumberFilter, StylizedNumber } from '../components'
import { StyleSheet, Text } from '@react-pdf/renderer'
import { FilterValueRange } from '../components/NumberFilter/NumberFilter'

export interface NumberProp extends BaseProp {
  config?: {
    pre?: string
    sub?: string
    isDecimal?: boolean
    isMoney?: boolean
    isBig?: boolean
    calculate?: 'sum' | 'average'

    // column?: ForView,
    field?: ForView &
      IRequired & {
        min?: number
        max?: number
      }
  }
}

export const createNumberProp =
  ({ title, minSize = MinSize.xs, config }: NumberProp): PropFactory =>
  key => {
    const {
      pre = '',
      sub = '',
      isDecimal = false,
      isMoney = false,
      isBig = false,
      calculate,
      field,
    } = config ?? {}

    const { hidden, required } = field ?? {}

    return {
      key,
      title,
      minSize,

      filterFn: (row, columnId, filterValue) => {
        const hasMin = filterValue.min !== undefined && filterValue.min !== ''
        const hasMax = filterValue.max !== undefined && filterValue.max !== ''

        if (!hasMin && !hasMax) return true

        const rawValue = row.getValue<undefined | number | string>(columnId)
        if (rawValue === undefined) return false

        const value = typeof rawValue === 'number' ? rawValue : Number(rawValue)
        if (isNaN(value)) return false

        const min = hasMin ? Number(filterValue.min) : undefined
        const max = hasMax ? Number(filterValue.max) : undefined

        if (min !== undefined && value < min) return false
        if (max !== undefined && value > max) return false

        return true
      },

      footer: info => {
        if (calculate === 'sum') {
          const total = info.table.getRowModel().rows.reduce((acc, row) => {
            const value = row.original[key] as undefined | number | string

            if (value === undefined) return acc

            const number = typeof value === 'string' ? Number(value) : value

            return acc + number
          }, 0)

          return <StylizedNumber value={total} {...{ isMoney, pre, sub }} />
        }
      },

      getFormField: (value, editMode = false) => {
        if (hidden === true) return

        return (
          <Input
            keyName={key}
            {...(!editMode && { required })}
            {...{ title, value, editMode }}
            inputHTMLAttrs={{
              type: 'number',
              step: isDecimal ? '0.000001' : undefined,
            }}
          />
        )
      },

      getFormFieldValue: (formData, _, editMode = false) => {
        const value = formData.get(key)

        if (value === null) return
        if (value === '') return editMode ? null : undefined

        return isBig ? value : Number(value)
      },

      getTableHeader: column => ({
        title,
        getFilter: () => <NumberFilter {...{ column, isDecimal }} />,
      }),

      getTableCell: item => {
        const value = item[key] as undefined | number | string

        if (value === undefined) return

        return <StylizedNumber {...{ value, isMoney, pre, sub }} />
      },

      getReportTableFilter: column => {
        const { getFilterValue } = column

        const value = getFilterValue() as FilterValueRange

        if (value === undefined) return

        const { min, max } = value

        const values = [] as string[]

        if (min !== undefined && min !== '') values.push(`min: ${min}`)
        if (max !== undefined && max !== '') values.push(`max: ${max}`)

        if (!values.length) return

        return { title, values }
      },

      getReportTableCell: item => {
        const value = item[key] as undefined | number | string

        if (value === undefined) return

        const styles = StyleSheet.create({
          value: {
            maxLines: 1,
          },
        })

        const displayValue = isMoney
          ? new Intl.NumberFormat('es-ES', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6,
            }).format(Number(value))
          : value

        return (
          <Text style={styles.value}>{[pre, displayValue, sub].join(' ')}</Text>
        )
      },

      getExcelTableCell: item => {
        const value = item[key] as undefined | number | string

        if (value === undefined) return

        const displayValue = isMoney
          ? new Intl.NumberFormat('es-ES', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6,
            }).format(Number(value))
          : value

        return pre + displayValue + sub
      },

      pieSectorConfig: {
        defaultMode: WDND_MODE.key,
        modes: {
          ...createUniqueMode({
            accumulate: (value: number | string, add) => {
              const key = typeof value === 'number' ? String(value) : value

              const getTitle = () =>
                isMoney
                  ? new Intl.NumberFormat('es-ES', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 6,
                    }).format(Number(value))
                  : typeof value === 'number'
                  ? String(value)
                  : value

              add(key, getTitle)
            },
          }),
        },
      },
    }
  }
