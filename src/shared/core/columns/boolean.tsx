import Checkbox from '@/pages/Admin/components/Checkbox/Checkbox'
import { NewCombobox } from '@/shared/components'
import { StyleSheet, Text } from '@react-pdf/renderer'
import {
  Column,
  ColumnBehavior,
  ColumnConfig,
  InputConfig,
  Size,
} from '../types'

export interface BooleanColumn extends Column {
  type: 'boolean'
  title: string
  falseText?: string
  trueText?: string
  allowNull?: boolean
  columnConfig?: ColumnConfig
  inputConfig?: InputConfig
}

const getBooleanFilterValue = (value: unknown): boolean | undefined =>
  typeof value === 'boolean' ? value : undefined

export const buildBooleanColumnBehavior = (
  def: BooleanColumn,
): ColumnBehavior => {
  const {
    key,
    title: originTitle,
    falseText = 'No',
    trueText = 'Si',
    allowNull = false,
    columnConfig,
    inputConfig,
  } = def

  const { size = Size.m, overrideTitle } = columnConfig ?? {}
  const { isHidden = false, isRequired = false } = inputConfig ?? {}
  const title = overrideTitle ?? originTitle

  const options = [
    { value: 'false', label: falseText },
    { value: 'true', label: trueText },
  ]

  return {
    usefulDef: {
      key,
      title,
      input: { isHidden },
      column: { size },
    },

    getFormField: (value, isEditMode = false) => {
      if (allowNull) {
        return (
          <div>
            <span>{title}</span>
            <NewCombobox
              name={key}
              options={options}
              defaultSelected={
                typeof value === 'boolean' ? [String(value)] : undefined
              }
              required={!isEditMode && isRequired}
            />
          </div>
        )
      }

      return (
        <Checkbox
          keyName={key}
          value={typeof value === 'boolean' ? value : undefined}
          {...(!isEditMode && { isRequired })}
          {...{ title, isEditMode, falseText, trueText }}
        />
      )
    },

    writeFormValue: (formValues, accData) => {
      if (!allowNull) {
        accData[key] = formValues.get.boolean(key)
        return
      }

      const value = formValues.get.string(key)
      if (!value) return

      const selected = JSON.parse(value) as string[]
      if (selected.length === 0) return

      accData[key] = selected[0] === 'true'
    },

    compareTableValues: (a, b) => {
      const booleanA = getBooleanFilterValue(a)
      const booleanB = getBooleanFilterValue(b)

      if (booleanA === undefined || booleanB === undefined) return 0
      if (booleanA === booleanB) return 0

      return booleanA ? 1 : -1
    },

    applyTableFilter: (value, filterValue) => {
      const selectedValue = getBooleanFilterValue(filterValue)

      return selectedValue === undefined || value === selectedValue
    },

    getTableFilter: (filterValue, setFilterValue) => {
      const selectedValue = getBooleanFilterValue(filterValue)

      return (
        <NewCombobox
          name={`${key}-filter`}
          options={options}
          selected={selectedValue === undefined ? [] : [String(selectedValue)]}
          onChange={selected => {
            const value = selected[0]
            setFilterValue(value === undefined ? undefined : value === 'true')
          }}
        />
      )
    },

    getTableCell: value => {
      if (typeof value !== 'boolean') return

      return <p className="text">{value ? trueText : falseText}</p>
    },

    getReportTableFilter: filterValue => {
      const value = getBooleanFilterValue(filterValue)

      if (value === undefined) return

      return { label: title, values: [value ? trueText : falseText] }
    },

    getReportTableCell: value => {
      if (typeof value !== 'boolean') return

      const styles = StyleSheet.create({
        value: {},
      })

      return <Text style={styles.value}>{value ? trueText : falseText}</Text>
    },
  }
}
