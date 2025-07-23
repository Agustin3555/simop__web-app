import { Color, PropFactory, ForView, MinSize, BaseProp } from './utils'
import { BooleanFilter, Checkbox } from '../components'
import { classList } from '@/helpers'

interface BooleanProp extends BaseProp {
  config?: {
    falseText?: string
    trueText?: string

    column?: ForView & {
      falseColor?: Color
      trueColor?: Color
    }
    field?: ForView
  }
}

export const createBooleanProp =
  ({ title, minSize = MinSize.xs, config }: BooleanProp): PropFactory =>
  key => {
    const { falseText = 'No', trueText = 'Si', column, field } = config ?? {}
    const { falseColor = 'grey', trueColor = 'green' } = column ?? {}
    const { hidden } = field ?? {}

    return {
      key,
      title,
      minSize,

      getFormField: (value, editMode = false) => {
        if (hidden) return

        return (
          <Checkbox
            keyName={key}
            {...{ title, value, editMode, falseText, trueText }}
          />
        )
      },

      getFormFieldValue: (formData, _, editMode = false) => {
        if (editMode && !formData.has(key)) return

        const value = formData.get(key)

        return value === 'on'
      },

      getTableHeader: column => {
        const { setFilterValue } = column

        return {
          title,
          getFilter: ({ getFilterValue }) => (
            <BooleanFilter
              keyName={key}
              {...{
                title,
                falseText,
                trueText,
                getFilterValue,
                setFilterValue,
              }}
            />
          ),
        }
      },

      getTableCell: item => {
        const value = item[key] as undefined | boolean

        return (
          value !== undefined && (
            <p
              className={classList(
                'highlighted',
                value ? trueColor : falseColor,
              )}
            >
              {value ? trueText : falseText}
            </p>
          )
        )
      },

      getExcelTableCell: item => {
        const value = item[key] as undefined | boolean

        if (value === undefined) return

        return value ? trueText : falseText
      },
    }
  }
