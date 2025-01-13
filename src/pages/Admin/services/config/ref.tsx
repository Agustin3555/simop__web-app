import { Entity, EntityKey } from '@/services/config'
import { ForView, GetScheme, PropScheme, Required } from './utils'
import { Combobox, FetchRef, TextFilter } from '../../components'
import { Ref } from '@/types'
import { AccessorFn, Column, Row } from '@tanstack/react-table'

export class RefProp<T extends EntityKey> implements PropScheme {
  baseKey: T

  constructor(
    public key: T,

    public config: GetScheme & {
      // column?: ForView,
      field?: ForView & Required
    },
  ) {
    this.key = `${key}Id` as T
    this.baseKey = key
  }

  getFieldComponent = () => {
    const { key, config } = this
    const { getScheme, field } = config
    const { hidden, required } = field ?? {}

    if (hidden === true) return

    const { service, title } = getScheme()
    const { getForConnect } = service

    return (
      <Combobox
        key={key}
        name={key}
        title={title.singular}
        {...{ getForConnect, required }}
      />
    )
  }

  getFieldValue = (formData: FormData) => {
    const { key, config } = this
    const { field } = config ?? {}
    const { hidden } = field ?? {}

    if (hidden === true) return

    const value = formData.get(key)

    if (value === '') return

    return Number(value)
  }

  accessorFn: AccessorFn<Entity> = row => {
    const { baseKey } = this

    const { title = '' } = (row[baseKey] as Ref) ?? {}

    return title
  }

  getHeader = (column: Column<Entity>) => {
    const { config } = this
    const { getScheme } = config
    const { title, refAnchorField } = getScheme()

    const { getFacetedUniqueValues, getFilterValue, setFilterValue } = column
    const filterValue = getFilterValue()

    const filter = (
      <TextFilter
        {...{ filterValue, getFacetedUniqueValues, setFilterValue }}
      />
    )

    return { title: title.singular, subtitle: refAnchorField, filter }
  }

  getCellComponent = (row: Row<Entity>) => {
    const { baseKey, config } = this
    const { getScheme } = config ?? {}

    const { getOne } = getScheme().service
    const value = row.original[baseKey] as Ref

    return <FetchRef {...value} {...{ getOne }} />
  }
}
