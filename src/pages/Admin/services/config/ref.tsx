import { Entity } from '@/services/config'
import { ForView, GetScheme, PropScheme, Required } from './utils'
import { Combobox, FetchRef, TextFilter } from '../../components'
import { AccessorFn, Column, Row } from '@tanstack/react-table'
import { getFlatProps } from './scheme'

export class RefProp implements PropScheme {
  _key = ''
  verboseKey = ''

  constructor(
    public config: GetScheme & {
      // column?: ForView,
      field?: ForView & Required
    },
  ) {}

  public get key() {
    return this._key
  }

  public set key(value: string) {
    this._key = value
    this.verboseKey = `${value}Id`
  }

  getFieldComponent = () => {
    const { verboseKey, config } = this
    const { getScheme, field } = config
    const { hidden, required } = field ?? {}

    if (hidden === true) return

    const scheme = getScheme()
    const { title } = scheme

    return (
      <Combobox
        keyName={verboseKey}
        title={title.singular}
        {...{ scheme, required }}
      />
    )
  }

  getFieldValue = (formData: FormData) => {
    const { verboseKey, config } = this
    const { field } = config ?? {}
    const { hidden } = field ?? {}

    if (hidden === true) return

    const value = formData.get(verboseKey)

    if (value === null) return

    return Number(value)
  }

  accessorFn: AccessorFn<Entity> = row => {
    const { key, config } = this
    const { getScheme } = config

    const scheme = getScheme()
    const { anchorField } = scheme

    return row[key]?.[anchorField]
  }

  getHeader = (column: Column<Entity>) => {
    const { config } = this
    const { getScheme } = config

    const scheme = getScheme()
    const { title, anchorField } = scheme
    const flatProps = getFlatProps(scheme)

    const { getFacetedUniqueValues, getFilterValue, setFilterValue } = column
    const filterValue = getFilterValue()

    const filter = (
      <TextFilter
        {...{ filterValue, getFacetedUniqueValues, setFilterValue }}
      />
    )

    return {
      title: title.singular,
      subtitle: flatProps[anchorField].title,
      filter,
    }
  }

  getCellComponent = (row: Row<Entity>) => {
    const { key, config } = this
    const { getScheme } = config ?? {}

    const { service, anchorField } = getScheme()
    const { getOne } = service

    const value = row.original[key] as any | undefined

    return (
      value && (
        <FetchRef id={value.id} title={value[anchorField]} {...{ getOne }} />
      )
    )
  }
}
