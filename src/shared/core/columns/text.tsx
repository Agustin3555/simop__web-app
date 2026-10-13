import {
  Column,
  ColumnBehavior,
  ColumnConfig,
  InputConfig,
  Size,
} from '../types'

export interface TextColumn extends Column {
  type: 'text'
  domain?: 'shortText' | 'longText' | 'email' | 'url'
  columnConfig?: ColumnConfig
  inputConfig?: InputConfig
}

export const buildTextColumnBehavior = (def: TextColumn): ColumnBehavior => {
  const {
    key,
    title,
    type,
    domain = 'shortText',
    columnConfig,
    inputConfig,
  } = def

  const { size = Size.m, overrideTitle } = columnConfig ?? {}
  const { isRequired = false } = inputConfig ?? {}

  return {
    def: {
      key,
      title,
      type,
      domain,
      columnConfig: { size, overrideTitle },
      inputConfig: { isRequired },
    },

    // getInput: (value, isEditMode = false) => {
    //   if (hidden === true) return

    //   return isLong ? (
    //     <InputArea
    //       keyName={key}
    //       {...(!isEditMode && { isRequired })}
    //       {...{ title, value, isEditMode }}
    //     />
    //   ) : (
    //     <Input
    //       keyName={key}
    //       {...(isURL && { inputHTMLAttrs: { type: 'url' } })}
    //       {...(!isEditMode && { isRequired })}
    //       {...{ title, value, isEditMode }}
    //     />
    //   )
    // },

    // getFormFieldValue: (formData, _, isEditMode = false) => {
    //   const value = formData.get(key)

    //   if (value === null) return
    //   if (value === '') return isEditMode ? null : undefined

    //   return (value as string).trim()
    // },

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

    // getReportTableFilter: column => {
    //   const { getFilterValue } = column

    //   const value = getFilterValue() as undefined | string
    //   if (value === undefined) return

    //   return { title, values: [value] }
    // },

    // getReportTableCell: item => {
    //   const value = item[key] as undefined | string

    //   if (value === undefined) return

    //   const styles = StyleSheet.create({
    //     value: {},
    //   })

    //   return <Text style={styles.value}>{value}</Text>
    // },

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
