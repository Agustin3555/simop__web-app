import { ForView, MinSize, PropFactory, IRequired, BaseProp } from './utils'
import { Input } from '@/components'
import { InputArea, TextFilter } from '../components'

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

      filterFn: 'includesString',

      getTableHeader: column => {
        const { getFacetedUniqueValues, setFilterValue } = column

        return {
          title,
          getFilter: ({ getFilterValue }) => (
            <TextFilter
              filterValue={getFilterValue()}
              {...{ getFacetedUniqueValues, setFilterValue }}
            />
          ),
        }
      },

      getTableCell: item => {
        const value = item[key] as undefined | string

        return value && <p className="text">{value}</p>
      },

      getExcelTableCell: item => {
        const value = item[key] as undefined | string

        return value
      },
    }
  }
