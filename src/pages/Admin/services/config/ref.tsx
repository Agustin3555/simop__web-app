import { GeneralEntity } from '@/models/config'
import {
  GetFilter,
  ForView,
  GetMetaModel,
  MinSize,
  PropScheme,
  Required,
} from './utils'
import { AutoCombobox, FetchRef, RefFilter } from '../../components'
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
    const metaModel = this.config.getMetaModel()

    return metaModel.title.singular
  }

  getFieldComponent = (value?: GeneralEntity, editMode = false) => {
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

  accessorFn: AccessorFn<GeneralEntity> = row => {
    const { key, config } = this
    const { getMetaModel } = config

    const metaModel = getMetaModel()
    const { anchorField } = metaModel

    return row[key]?.[anchorField]
  }

  filterFn: FilterFn<GeneralEntity> = (
    row,
    columnId,
    filterValue?: string[],
  ) => {
    if (!filterValue?.length) return true

    const entity = row.original[columnId] as undefined | GeneralEntity

    if (entity === undefined) return false

    return filterValue.includes(String(entity.id))
  }

  getHeader = (column: Column<GeneralEntity>) => {
    const { verboseKey, title, config } = this
    const { getMetaModel } = config

    const metaModel = getMetaModel()

    const { setFilterValue } = column

    const getFilter: GetFilter = ({ options, ...rest }) => (
      <RefFilter
        keyName={verboseKey}
        options={options!}
        {...{ title, setFilterValue, ...rest }}
      />
    )

    return { title, metaModel, getFilter }
  }

  getValueComponent = (item: GeneralEntity, selectedSearchMode?: string) => {
    const { key, config } = this
    const { getMetaModel } = config ?? {}

    const { key: keyScheme, service, anchorField } = getMetaModel()
    const { getOne } = service

    const value = item[key] as undefined | GeneralEntity

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

  getExcelValue = (item: GeneralEntity) => {
    const { key, config } = this
    const { getMetaModel } = config

    const { anchorField } = getMetaModel()

    const value = item[key] as undefined | Partial<GeneralEntity>

    if (value === undefined) return

    return value[anchorField]
  }
}
