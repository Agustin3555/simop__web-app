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
import { InputArea, TextFilter } from '../components'
import { StyleSheet, Text } from '@react-pdf/renderer'

interface TextProp extends BaseProp {
  config?: {
    isLong?: boolean

    field?: ForView & IRequired
  }
}

export const createTextProp =
  ({ title, minSize, config }: TextProp): PropFactory =>
  key => {
    const { isLong = false, field } = config ?? {}
    const { hidden, required } = field ?? {}

    return {
      key,
      title,
      minSize: minSize ?? isLong ? MinSize.xl : MinSize.m,

      filterFn: 'includesString',

      getFormField: (value, editMode = false) => {
        if (hidden === true) return

        return isLong ? (
          <InputArea
            keyName={key}
            {...(!editMode && { required })}
            {...{ title, value, editMode }}
          />
        ) : (
          <Input
            keyName={key}
            {...(!editMode && { required })}
            {...{ title, value, editMode }}
          />
        )
      },

      getFormFieldValue: (formData, _, editMode = false) => {
        const value = formData.get(key)

        if (value === null) return
        if (value === '') return editMode ? null : undefined

        return (value as string).trim()
      },

      getTableHeader: column => ({
        title,
        getFilter: () => <TextFilter {...{ column }} />,
      }),

      getTableCell: item => {
        const value = item[key] as undefined | string

        return value && <p className="text">{value}</p>
      },

      getReportTableFilter: column => {
        const { getFilterValue } = column

        const value = getFilterValue() as undefined | string
        if (value === undefined) return

        return { title, values: [value] }
      },

      getReportTableCell: item => {
        const value = item[key] as undefined | string

        if (value === undefined) return

        const styles = StyleSheet.create({
          value: {},
        })

        return <Text style={styles.value}>{value}</Text>
      },

      getExcelTableCell: item => {
        const value = item[key] as undefined | string

        return value
      },

      pieSectorConfig: {
        defaultMode: WDND_MODE.key,
        modes: {
          ...createUniqueMode({
            accumulate: (value: string, add) => {
              const key = value
              const getTitle = () => value

              add(key, getTitle)
            },
          }),
        },
      },
    }
  }
