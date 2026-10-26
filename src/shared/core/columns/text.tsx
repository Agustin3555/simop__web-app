import InputArea from '@/pages/Admin/components/InputArea/InputArea'
import {
  Column,
  ColumnBehavior,
  ColumnConfig,
  InputConfig,
  Size,
} from '../types'
import { Input } from '@/components'
import { StyleSheet, Text } from '@react-pdf/renderer'
import { COLOR_MATCHER, palColor } from '@/styles/palette'

export interface TextColumn extends Column {
  type: 'text'
  title: string
  domain?: 'shortText' | 'longText' | 'email' | 'url'
  columnConfig?: ColumnConfig
  inputConfig?: InputConfig
}

export const buildTextColumnBehavior = (def: TextColumn): ColumnBehavior => {
  const {
    key,
    title: originTitle,
    domain = 'shortText',
    columnConfig,
    inputConfig,
  } = def

  const { size = Size.m, overrideTitle } = columnConfig ?? {}
  const { isHidden = false, isRequired = false } = inputConfig ?? {}

  const title = overrideTitle ?? originTitle

  return {
    usefulDef: {
      key,
      title,
      input: { isHidden },
      column: { size },
    },

    getFormField: (value, isEditMode = false) => {
      if (domain === 'longText') {
        return (
          <InputArea
            keyName={key}
            value={typeof value === 'string' ? value : undefined}
            {...(!isEditMode && { isRequired })}
            {...{ title, isEditMode }}
          />
        )
      }

      return (
        <Input
          keyName={key}
          value={typeof value === 'string' ? value : undefined}
          {...(domain === 'url' && { inputHTMLAttrs: { type: 'url' } })}
          {...(!isEditMode && { isRequired })}
          {...{ title, isEditMode }}
        />
      )
    },

    writeFormValue: (formValues, accData) => {
      const value = formValues.get.string(key).trim()
      accData[key] = value === '' ? null : value
    },

    compareTableValues: (a, b) => {
      if (typeof a !== 'string' || typeof b !== 'string') return 0

      return a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: 'base',
      })
    },

    applyTableFilter: (value, filterValue) => {
      const search = typeof filterValue === 'string' ? filterValue.trim() : ''

      if (!search) return true

      return (
        typeof value === 'string' &&
        value.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    },

    getTableFilter: (filterValue = '', setFilterValue) => {
      if (typeof filterValue !== 'string') return

      return (
        <label>
          <input
            value={filterValue}
            placeholder="Buscar..."
            onChange={({ currentTarget: { value } }) => setFilterValue(value)}
          />
        </label>
      )
    },

    getTableCell: value => {
      if (!value || typeof value !== 'string') return

      if (domain === 'email') {
        return (
          <a className="text" href={`mailto:${value}`}>
            {value}
          </a>
        )
      }

      if (domain === 'url') {
        return (
          <a
            className="text"
            href={value}
            target="_blank"
            rel="noopener noreferrer"
          >
            {value}
          </a>
        )
      }

      if (domain === 'longText' || domain === 'shortText') {
        return <p className="text">{value}</p>
      }
    },

    getReportTableFilter: filterValue => {
      if (typeof filterValue !== 'string') return

      return { label: title, values: [filterValue] }
    },

    getReportTableCell: value => {
      if (!value || typeof value !== 'string') return

      const styles = StyleSheet.create({
        value: {
          ...((domain === 'email' || domain === 'url') && {
            textDecoration: 'underline',
            textDecorationStyle: 'solid',
            textDecorationColor: palColor('A'),
          }),
        },
      })

      return <Text style={styles.value}>{value}</Text>
    },

    // getExcelTableCell: item => {
    //   const value = item[key] as undefined | string

    //   return value
    // },

    // pieSectorConfig: {
    //   defaultMode: WDND_MODE.key,
    //   modes: {
    //     ...createUniqueMode({
    //       accumulate: (value: string, add) => {
    //         const key = value
    //         const getTitle = () => value

    //         add(key, getTitle)
    //       },
    //     }),
    //   },
    // },
  }
}
