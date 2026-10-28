import { Input } from '@/components'
import {
  ColumnBehavior,
  Size,
  Column,
  InputConfig,
  ColumnConfig,
} from '../types'
import { StyleSheet, Text } from '@react-pdf/renderer'
import { Field } from '@/shared/components/Field/Field'

interface NumberRange {
  exact: string
  min: string
  max: string
}

const getNumberRange = (value: unknown): NumberRange => {
  if (typeof value !== 'object' || value === null) {
    return { exact: '', min: '', max: '' }
  }

  const range = value as Record<string, unknown>

  return {
    exact:
      typeof range.exact === 'string' || typeof range.exact === 'number'
        ? String(range.exact)
        : '',
    min:
      typeof range.min === 'string' || typeof range.min === 'number'
        ? String(range.min)
        : '',
    max:
      typeof range.max === 'string' || typeof range.max === 'number'
        ? String(range.max)
        : '',
  }
}

const toNumber = (value: unknown) => {
  if (typeof value !== 'number' && typeof value !== 'string') return

  if (typeof value === 'string' && value.trim() === '') return

  const number = Number(value)

  return Number.isFinite(number) ? number : undefined
}

type CalcType = 'sum' | 'average'

export interface NumberColumn extends Column {
  type: 'number'
  title: string
  pre?: string
  sub?: string
  isDecimal?: boolean
  isMoney?: boolean
  isBig?: boolean
  columnConfig?: ColumnConfig & {
    calc?: CalcType
  }
  inputConfig?: InputConfig & {
    min?: number
    max?: number
  }
}

export const buildNumberColumnBehavior = (
  def: NumberColumn,
): ColumnBehavior => {
  const {
    key,
    title: originTitle,
    pre = '',
    sub = '',
    isDecimal = false,
    isMoney = false,
    isBig = false,
    columnConfig,
    inputConfig,
  } = def

  const { size = Size.m, overrideTitle } = columnConfig ?? {}
  const { isHidden = false, isRequired = false, min, max } = inputConfig ?? {}

  const title = overrideTitle ?? originTitle

  return {
    usefulDef: {
      key,
      title,
      input: { isHidden },
      column: { size },
    },

    getFormField: (value, isEditMode = false) => {
      return (
        <Field {...{ title }} hideTitle={isEditMode}>
          <Input
            keyName={key}
            value={
              typeof value === 'string' || typeof value === 'number'
                ? value
                : undefined
            }
            {...(!isEditMode && { isRequired })}
            {...{ title, isEditMode }}
            inputHTMLAttrs={{
              type: 'number',
              step: isDecimal ? '0.000001' : undefined,
            }}
          />
        </Field>
      )
    },

    writeFormValue: (formValues, accData) => {
      const value = isBig
        ? formValues.get.string(key)
        : formValues.get.number(key)

      if (!value) return

      accData[key] = value
    },

    compareTableValues: (a, b) => {
      const numberA = toNumber(a)
      const numberB = toNumber(b)

      if (numberA === undefined || numberB === undefined) return 0

      return numberA - numberB
    },

    applyTableFilter: (value, filterValue) => {
      const { exact, min, max } = getNumberRange(filterValue)
      const hasExact = exact !== ''
      const hasMin = min !== ''
      const hasMax = max !== ''

      if (!hasExact && !hasMin && !hasMax) return true

      const number = toNumber(value)
      if (number === undefined) return false

      const exactValue = hasExact ? toNumber(exact) : undefined
      const minValue = hasMin ? toNumber(min) : undefined
      const maxValue = hasMax ? toNumber(max) : undefined

      if (hasExact && exactValue === undefined) return false
      if (hasMin && minValue === undefined) return false
      if (hasMax && maxValue === undefined) return false
      if (exactValue !== undefined && number !== exactValue) return false
      if (minValue !== undefined && number < minValue) return false
      if (maxValue !== undefined && number > maxValue) return false

      return true
    },

    getTableFilter: (filterValue, setFilterValue) => {
      const range = getNumberRange(filterValue)
      const updateRange = (bound: keyof NumberRange, value: string) => {
        const nextRange = { ...range, [bound]: value }
        const hasRange = Object.values(nextRange).some(
          rangeValue => rangeValue.trim() !== '',
        )

        setFilterValue(hasRange ? nextRange : undefined)
      }

      return (
        <>
          <label>
            <span>Búsqueda exacta</span>
            <input
              type="number"
              step={isDecimal ? '0.000001' : '1'}
              placeholder="Buscar..."
              value={range.exact}
              onChange={({ currentTarget: { value } }) => {
                updateRange('exact', value)
              }}
            />
          </label>
          <div>
            <label>
              <span>Desde</span>
              <input
                type="number"
                step={isDecimal ? '0.000001' : '1'}
                placeholder="Min..."
                value={range.min}
                onChange={({ currentTarget: { value } }) => {
                  updateRange('min', value)
                }}
              />
            </label>
            <label>
              <span>Hasta</span>
              <input
                type="number"
                step={isDecimal ? '0.000001' : '1'}
                placeholder="Max..."
                value={range.max}
                onChange={({ currentTarget: { value } }) => {
                  updateRange('max', value)
                }}
              />
            </label>
          </div>
        </>
      )
    },

    getTableCell: value => {
      if (value === undefined || value === null) return
      if (typeof value !== 'number' && typeof value !== 'string') return

      const displayValue = isMoney
        ? new Intl.NumberFormat('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 6,
          }).format(Number(value))
        : value

      return (
        <p className="text">
          {pre && <small className="pre">{pre}</small>}
          {displayValue}
          {sub && <small className="sub">{sub}</small>}
        </p>
      )
    },

    getTableFooterCalcs: () => {
      const getNumbers = (values: unknown[]) =>
        values.map(toNumber).filter((v): v is number => v !== undefined)

      const calcs: Record<
        CalcType,
        { label: string; getResult: (values: unknown[]) => number }
      > = {
        sum: {
          label: 'Suma',
          getResult: values => {
            const numbers = getNumbers(values)
            return numbers.reduce((total, number) => total + number, 0)
          },
        },
        average: {
          label: 'Promedio',
          getResult: values => {
            const numbers = getNumbers(values)
            return (
              numbers.reduce((total, number) => total + number, 0) /
              numbers.length
            )
          },
        },
      }

      return calcs
    },

    getReportTableFilter: filterValue => {
      const { exact, min, max } = getNumberRange(filterValue)

      const values: string[] = []
      if (exact !== '') values.push(exact)
      if (min !== '') values.push(`Min: ${min}`)
      if (max !== '') values.push(`Max: ${max}`)

      if (values.length === 0) return

      return { label: title, values }
    },

    getReportTableCell: value => {
      if (value === undefined || value === null) return
      if (typeof value !== 'number' && typeof value !== 'string') return

      const styles = StyleSheet.create({
        value: {},
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
  }
}
