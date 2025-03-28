import { Entity } from '@/services/config'
import { ForView, GetScheme, MinSize, PropScheme, Required } from './utils'
import { AutoCombobox, FetchRef, TextFilter } from '../../components'
import { AccessorFn, Column, Row } from '@tanstack/react-table'
import { getFlatProps } from './scheme'

export const isFieldEnabled = (form: HTMLFormElement, key: string) => {
  const inputOption = form.querySelector<HTMLInputElement>(`[name="${key}"]`)

  // Verifica si 'inputOption' está dentro de un 'fieldset' habilitado
  return inputOption && !inputOption.closest('fieldset')?.disabled
}

export class RefProp implements PropScheme {
  _key = ''
  verboseKey = ''

  constructor(
    public config: GetScheme & {
      // column?: ForView,
      field?: ForView & Required
    },

    public minSize: MinSize = 'm',
  ) {}

  public get key() {
    return this._key
  }

  public set key(value: string) {
    this._key = value
    this.verboseKey = `${value}Id`
  }

  public get title() {
    const scheme = this.config.getScheme()

    return scheme.title.singular
  }

  getFieldComponent = (value?: Partial<Entity>, editMode = false) => {
    const { verboseKey, title, config } = this
    const { getScheme, field } = config
    const { hidden, required } = field ?? {}

    if (hidden === true) return

    const scheme = getScheme()

    return (
      <AutoCombobox
        keyName={verboseKey}
        initSelected={value && [value]}
        {...(!editMode && { required })}
        {...{ title, editMode, scheme }}
      />
    )
  }

  getFieldValue = (
    formData: FormData,
    form: HTMLFormElement,
    editMode = false,
  ) => {
    const { verboseKey } = this

    const value = formData.get(verboseKey)

    if (value === null) {
      if (editMode && isFieldEnabled(form, verboseKey)) return null
      return
    }

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
    const { title, config } = this
    const { getScheme } = config

    const scheme = getScheme()
    const { anchorField } = scheme
    const flatProps = getFlatProps(scheme)

    const { getFacetedUniqueValues, getFilterValue, setFilterValue } = column
    const filterValue = getFilterValue()

    const filter = (
      <TextFilter
        {...{ filterValue, getFacetedUniqueValues, setFilterValue }}
      />
    )

    return { title, subtitle: flatProps[anchorField].title, filter }
  }

  getCellComponent = (row: Row<Entity>) => {
    const { key, config } = this
    const { getScheme } = config ?? {}

    const { service, anchorField } = getScheme()
    const { getOne } = service

    const value = row.original[key] as undefined | any

    return (
      value && (
        <FetchRef id={value.id} title={value[anchorField]} {...{ getOne }} />
      )
    )
  }

  getExcelValue = (item: Entity) => {
    const { key, config } = this
    const { getScheme } = config

    const { anchorField } = getScheme()

    const value = item[key] as undefined | Partial<Entity>

    if (value === undefined) return

    return value[anchorField]
  }
}
