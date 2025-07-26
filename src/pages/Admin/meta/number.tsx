import { ForView, MinSize, PropFactory, IRequired, BaseProp } from './utils'
import { Input } from '@/components'
import { NumberFilter, StylizedNumber } from '../components'

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

      filterFn: 'inNumberRange',

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

      getTableHeader: column => {
        const { setFilterValue, getFacetedMinMaxValues } = column

        return {
          title,
          getFilter: ({ getFilterValue }) => (
            <NumberFilter
              decimal={isDecimal}
              {...{
                getFilterValue,
                setFilterValue,
                getFacetedMinMaxValues,
              }}
            />
          ),
        }
      },

      getTableCell: item => {
        const value = item[key] as undefined | number | string

        if (value === undefined) return

        return <StylizedNumber {...{ value, isMoney, pre, sub }} />
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
    }
  }
