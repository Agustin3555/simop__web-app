import { Entity, Ref } from '@/services/config'
import { ForView, GetScheme, PropScheme, Required } from './utils'
import { Combobox, FetchRef, TextFilter } from '../../components'
import { AccessorFn, Column, Row } from '@tanstack/react-table'

export class RefProp implements PropScheme {
  private _key = ''
  private _keyId = ''

  constructor(
    public config: GetScheme & {
      // column?: ForView,
      field?: ForView & Required
    },
  ) {}

  get key() {
    return this._key
  }

  set key(value) {
    this._key = value
    this._keyId = `${value}Id`
  }

  getFieldComponent = () => {
    const { _keyId, config } = this
    const { getScheme, field } = config
    const { hidden, required } = field ?? {}

    if (hidden === true) return

    const scheme = getScheme()

    return <Combobox key={_keyId} name={_keyId} {...{ scheme, required }} />
  }

  getFieldValue = (formData: FormData) => {
    const { _keyId, config } = this
    const { field } = config ?? {}
    const { hidden } = field ?? {}

    if (hidden === true) return

    const value = formData.get(_keyId)

    if (value === null) return

    return Number(value)
  }

  accessorFn: AccessorFn<Entity> = row => {
    const { key } = this

    const { title = '' } = (row[key] as Ref) ?? {}

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
    const { key, config } = this
    const { getScheme } = config ?? {}

    const { getOne } = getScheme().service
    const value = row.original[key] as Ref | undefined

    return value && <FetchRef {...value} {...{ getOne }} />
  }
}
