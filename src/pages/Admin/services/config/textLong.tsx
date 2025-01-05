import { Entity, EntityKey } from '@/services/config'
import { ForView, PropScheme, Required } from './utils'
import { FormValues } from '@/hooks'
import { Column, Row } from '@tanstack/react-table'
import { InputArea, TextFilter } from '../../components'

export class TextLongProp<T extends EntityKey> implements PropScheme {
  constructor(
    public key: T,
    public title: string,

    public config?: {
      // column?: ForView,
      field?: ForView & Required
    },
  ) {}

  getFieldComponent = () => {
    const { key, title, config } = this
    const { field } = config ?? {}
    const { hidden, required } = field ?? {}

    if (hidden === true) return

    return <InputArea key={key} name={key} {...{ title, required }} />
  }

  getFieldValue = (formValues: FormValues) => {
    const { key, config } = this
    const { field } = config ?? {}
    const { hidden } = field ?? {}

    if (hidden === true) return

    return formValues.get.string(key)
  }

  getHeader = (column: Column<Entity>) => {
    const { title } = this

    const { getFacetedUniqueValues, getFilterValue, setFilterValue } = column
    const filterValue = getFilterValue()

    const filter = (
      <TextFilter
        {...{ filterValue, getFacetedUniqueValues, setFilterValue }}
      />
    )

    return { title, filter }
  }

  getCellComponent = (row: Row<Entity>) => {
    const { key } = this

    const value = row.original[key] as string

    return <p>{value}</p>
  }
}
