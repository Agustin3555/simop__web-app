import { Entity } from '@/services/config'
import {
  GetFilter,
  ForView,
  GetScheme,
  MinSize,
  PropScheme,
  Required,
} from './utils'
import { AutoCombobox, FetchRef, RefFilter } from '../../components'
import { AccessorFn, Column, FilterFn, Row } from '@tanstack/react-table'

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

    public minSize = MinSize.m,
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

  getFieldComponent = (value?: Entity, editMode = false) => {
    const { verboseKey, title, config } = this
    const { getScheme, field } = config
    const { hidden, required } = field ?? {}

    if (hidden === true) return

    const scheme = getScheme()

    return (
      <AutoCombobox
        keyName={verboseKey}
        initOptions={value && [value]}
        {...{ title, required, editMode, scheme }}
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

  filterFn: FilterFn<Entity> = (row, columnId, filterValue?: string[]) => {
    if (!filterValue?.length) return true

    const entity = row.original[columnId] as undefined | Entity

    if (entity === undefined) return false

    return filterValue.includes(String(entity.id))
  }

  getHeader = (column: Column<Entity>) => {
    const { verboseKey, title, config } = this
    const { getScheme } = config

    const scheme = getScheme()

    const { setFilterValue } = column

    const getFilter: GetFilter = ({ options, ...rest }) => (
      <RefFilter
        keyName={verboseKey}
        options={options!}
        {...{ title, setFilterValue, ...rest }}
      />
    )

    return { title, scheme, getFilter }
  }

  getCellComponent = (row: Row<Entity>, selectedSearchMode?: string) => {
    const { key, config } = this
    const { getScheme } = config ?? {}

    const { service, key: keyScheme } = getScheme()
    const { getOne } = service

    const value = row.original[key] as undefined | Entity

    return (
      value && (
        <FetchRef
          id={value.id}
          title={value[selectedSearchMode!]}
          {...{ keyScheme, getOne }}
        />
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
