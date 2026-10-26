import { Input } from '@/components'
import { format } from '@formkit/tempo'
import { StyleSheet, Text } from '@react-pdf/renderer'
import {
  Column,
  ColumnBehavior,
  ColumnConfig,
  InputConfig,
  Size,
} from '../types'

export const formatter = (value: string, withTime: boolean) =>
  withTime
    ? format(value, { date: 'short', time: 'short' })
    : format(value.slice(0, 10), { date: 'short' })

interface DateRange {
  min: string
  max: string
}

const getDateRange = (value: unknown): DateRange => {
  if (typeof value !== 'object' || value === null) {
    return { min: '', max: '' }
  }

  const range = value as Record<string, unknown>

  return {
    min: typeof range.min === 'string' ? range.min : '',
    max: typeof range.max === 'string' ? range.max : '',
  }
}

const getTimestamp = (value: unknown) => {
  if (typeof value !== 'string' || value.trim() === '') return

  const timestamp = Date.parse(value)

  return Number.isFinite(timestamp) ? timestamp : undefined
}

const getInputValue = (value: unknown, withTime: boolean) => {
  if (typeof value !== 'string' || getTimestamp(value) === undefined) {
    return undefined
  }

  if (!withTime) return value.slice(0, 10)

  return new Date(value).toISOString().slice(0, 16)
}

export interface DatetimeColumn extends Column {
  type: 'datetime'
  title: string
  withTime?: boolean
  columnConfig?: ColumnConfig
  inputConfig?: InputConfig
}

export const buildDatetimeColumnBehavior = (
  def: DatetimeColumn,
): ColumnBehavior => {
  const {
    key,
    title: originTitle,
    withTime = false,
    columnConfig,
    inputConfig,
  } = def

  const { size = withTime ? Size.s : Size.xs, overrideTitle } =
    columnConfig ?? {}
  const { isHidden = false, isRequired = false } = inputConfig ?? {}
  const title = overrideTitle ?? originTitle

  return {
    usefulDef: {
      key,
      title,
      input: { isHidden },
      column: { size },
    },

    getFormField: (value, isEditMode = false) => (
      <Input
        keyName={key}
        value={getInputValue(value, withTime)}
        {...(!isEditMode && { isRequired })}
        {...{ title, isEditMode }}
        inputHTMLAttrs={{
          type: withTime ? 'datetime-local' : 'date',
          min: withTime ? '1900-01-01T00:00' : '1900-01-01',
        }}
      />
    ),

    writeFormValue: (formValues, accData) => {
      const value = formValues.get.string(key)

      accData[key] = value ? value + (withTime ? ':00Z' : 'T00:00:00Z') : null
    },

    compareTableValues: (a, b) => {
      const timestampA = getTimestamp(a)
      const timestampB = getTimestamp(b)

      if (timestampA === undefined || timestampB === undefined) return 0

      return timestampA - timestampB
    },

    applyTableFilter: (value, filterValue) => {
      const { min, max } = getDateRange(filterValue)
      const hasMin = min !== ''
      const hasMax = max !== ''

      if (!hasMin && !hasMax) return true

      const timestamp = getTimestamp(value)
      if (timestamp === undefined) return false

      const minTimestamp = hasMin ? getTimestamp(min) : undefined
      const maxTimestamp = hasMax ? getTimestamp(max) : undefined

      if (hasMin && minTimestamp === undefined) return false
      if (hasMax && maxTimestamp === undefined) return false
      if (minTimestamp !== undefined && timestamp < minTimestamp) return false
      if (maxTimestamp !== undefined && timestamp > maxTimestamp) return false

      return true
    },

    getTableFilter: (filterValue, setFilterValue) => {
      const range = getDateRange(filterValue)
      const updateRange = (bound: keyof DateRange, value: string) => {
        const nextRange = { ...range, [bound]: value }
        const hasRange = Object.values(nextRange).some(
          rangeValue => rangeValue !== '',
        )

        setFilterValue(hasRange ? nextRange : undefined)
      }

      return (
        <>
          <label>
            <span>Desde</span>
            <input
              type={withTime ? 'datetime-local' : 'date'}
              value={range.min}
              onChange={({ currentTarget: { value } }) =>
                updateRange('min', value)
              }
            />
          </label>
          <label>
            <span>Hasta</span>
            <input
              type={withTime ? 'datetime-local' : 'date'}
              value={range.max}
              onChange={({ currentTarget: { value } }) =>
                updateRange('max', value)
              }
            />
          </label>
        </>
      )
    },

    getTableCell: value => {
      if (typeof value !== 'string' || getTimestamp(value) === undefined) return

      return <p className="text">{formatter(value, withTime)}</p>
    },

    getReportTableFilter: filterValue => {
      const { min, max } = getDateRange(filterValue)
      const values: string[] = []

      if (min !== '') values.push(`Desde: ${formatter(min, withTime)}`)
      if (max !== '') values.push(`Hasta: ${formatter(max, withTime)}`)

      return values.length ? { label: title, values } : undefined
    },

    getReportTableCell: value => {
      if (typeof value !== 'string' || getTimestamp(value) === undefined) return

      const styles = StyleSheet.create({
        value: {},
      })

      return <Text style={styles.value}>{formatter(value, withTime)}</Text>
    },
  }
}
