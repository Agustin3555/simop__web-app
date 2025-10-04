import {
  Color,
  PropFactory,
  ForView,
  MinSize,
  BaseProp,
  createUniqueMode,
  UNIQUE_MODE,
} from './utils'
import { BooleanFilter, Checkbox, Combobox } from '../components'
import { classList } from '@/helpers'
import { StyleSheet, Text } from '@react-pdf/renderer'
import { isFieldEnabled } from './ref'

interface BooleanProp extends BaseProp {
  config?: {
    falseText?: string
    trueText?: string
    allowNull?: boolean

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
    const {
      falseText = 'No',
      trueText = 'Si',
      allowNull = false,
      column,
      field,
    } = config ?? {}

    const { falseColor = 'grey', trueColor = 'green' } = column ?? {}
    const { hidden } = field ?? {}

    return {
      key,
      title,
      minSize,

      getFormField: (value, editMode = false) => {
        if (hidden) return

        if (allowNull) {
          return (
            <Combobox
              keyName={key}
              options={[
                { id: 'false', title: falseText },
                { id: 'true', title: trueText },
              ]}
              initSelected={value === undefined ? undefined : [String(value)]}
              {...{ title, editMode }}
            />
          )
        }

        return (
          <Checkbox
            keyName={key}
            {...{ title, value, editMode, falseText, trueText }}
          />
        )
      },

      getFormFieldValue: (formData, form, editMode = false) => {
        const value = formData.get(key)

        if (allowNull) {
          if (value === null) {
            if (editMode && isFieldEnabled(form, key)) return null
            return
          }

          return value === 'true'
        }

        if (editMode && !formData.has(key)) return

        return value === 'on'
      },

      getTableHeader: column => ({
        title,
        getFilter: () => (
          <BooleanFilter
            keyName={key}
            {...{
              column,
              title,
              falseText,
              trueText,
            }}
          />
        ),
      }),

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

      getReportTableFilter: column => {
        const { getFilterValue } = column

        const value = getFilterValue() as undefined | boolean
        if (value === undefined) return

        return { title, values: [value ? trueText : falseText] }
      },

      getReportTableCell: item => {
        const value = item[key] as undefined | boolean

        if (value === undefined) return

        const styles = StyleSheet.create({
          value: {},
        })

        return <Text style={styles.value}>{value ? trueText : falseText}</Text>
      },

      getExcelTableCell: item => {
        const value = item[key] as undefined | boolean

        if (value === undefined) return

        return value ? trueText : falseText
      },

      pieSectorConfig: {
        defaultMode: UNIQUE_MODE.key,
        modes: {
          ...createUniqueMode({
            accumulate: (value: boolean, add) => {
              const key = String(value)
              const getTitle = () => (value ? trueText : falseText)

              add(key, getTitle)
            },
          }),
        },
      },
    }
  }
