import { LooseEntity } from '@/models/config'
import {
  GetFilter,
  ForView,
  GetMetaModel,
  MinSize,
  PropScheme,
  Required,
} from './utils'
import { AutoCombobox, FetchRef, RefFilter } from '../components'
import { AccessorFn, Column, FilterFn } from '@tanstack/react-table'

export const isFieldEnabled = (form: HTMLFormElement, key: string) => {
  const inputOption = form.querySelector<HTMLInputElement>(`[name="${key}"]`)

  // Verifica si 'inputOption' está dentro de un 'fieldset' habilitado
  return inputOption && !inputOption.closest('fieldset')?.disabled
}

export class RefProp implements PropScheme {
  _key = ''
  verboseKey = ''

  constructor(
    public config: GetMetaModel & {
      // column?: ForView,
      field?: ForView & Required
    },

    public minSize: MinSize | number = MinSize.s,
  ) {}

  public get key() {
    return this._key
  }

  public set key(value: string) {
    this._key = value
    this.verboseKey = `${value}Id`
  }

  public get title() {
    const metaModel = this.config.getMetaModel()

    return metaModel.title.singular
  }

  getFormField = (value?: LooseEntity, editMode = false) => {
    const { verboseKey, title, config } = this
    const { getMetaModel, field } = config
    const { hidden, required } = field ?? {}

    if (hidden === true) return

    const metaModel = getMetaModel()

    return (
      <AutoCombobox
        keyName={verboseKey}
        initOptions={value && [value]}
        {...{ title, required, editMode, metaModel }}
      />
    )
  }

  getFormFieldValue = (
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

  accessorFn: AccessorFn<LooseEntity> = row => {
    const { key, config } = this
    const { getMetaModel } = config

    const metaModel = getMetaModel()
    const { anchorField } = metaModel

    return row[key]?.[anchorField]
  }

  filterFn: FilterFn<LooseEntity> = (row, columnId, filterValue?: string[]) => {
    if (!filterValue?.length) return true

    const entity = row.original[columnId] as undefined | LooseEntity

    if (entity === undefined) return false

    return filterValue.includes(String(entity.id))
  }

  getTableHeader = (column: Column<LooseEntity>) => {
    const { verboseKey, title, config } = this
    const { getMetaModel } = config

    const metaModel = getMetaModel()

    const { setFilterValue } = column

    const getFilter: GetFilter = ({ options, ...rest }) =>
      options && (
        <RefFilter
          keyName={verboseKey}
          options={options}
          {...{ title, setFilterValue, ...rest }}
        />
      )

    return { title, metaModel, getFilter }
  }

  getTableCell = (item: LooseEntity, selectedSearchMode?: string) => {
    const { key, config } = this
    const { getMetaModel } = config ?? {}

    const { key: keyScheme, service, anchorField } = getMetaModel()
    const { getOne } = service

    const value = item[key] as undefined | LooseEntity

    return (
      value && (
        <FetchRef
          id={value.id}
          title={value[selectedSearchMode ?? anchorField]}
          {...{ keyScheme, getOne }}
        />
      )
    )
  }

  getExcelTableCell = (item: LooseEntity) => {
    const { key, config } = this
    const { getMetaModel } = config

    const { anchorField } = getMetaModel()

    const value = item[key] as undefined | Partial<LooseEntity>

    if (value === undefined) return

    return value[anchorField]
  }
}
