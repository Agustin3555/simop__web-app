import {
  ColumnBehavior,
  Size,
  Column,
  InputConfig,
  ColumnConfig,
} from '../types'

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

export interface NumberColumn extends Column {
  type: 'number'
  pre?: string
  sub?: string
  isDecimal?: boolean
  isMoney?: boolean
  isBig?: boolean
  columnConfig?: ColumnConfig
  // TODO
  // columnConfig?: ColumnConfig & {
  //   calc?: 'sum' | 'average'
  // }
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
    title,
    type,
    pre = '',
    sub = '',
    isDecimal = false,
    isMoney = false,
    isBig = false,
    columnConfig,
    inputConfig,
  } = def

  const { size = Size.m, overrideTitle } = columnConfig ?? {}
  const { isRequired = false, min, max } = inputConfig ?? {}

  return {
    def: {
      key,
      title,
      type,
      pre,
      sub,
      isDecimal,
      isMoney,
      isBig,
      columnConfig: { size, overrideTitle },
      inputConfig: { isRequired, min, max },
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
      const updateRange = (bound: keyof NumberRange, value: string) =>
        setFilterValue({ ...range, [bound]: value })

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

    getTableColumnCalcs: values => {
      const numbers = values
        .map(toNumber)
        .filter((value): value is number => value !== undefined)

      return [
        {
          value: 'sum',
          label: 'Suma',
          result: () => numbers.reduce((total, number) => total + number, 0),
        },
        {
          value: 'average',
          label: 'Promedio',
          result: () =>
            numbers.length
              ? numbers.reduce((total, number) => total + number, 0) /
                numbers.length
              : undefined,
        },
      ]
    },
  }
}
