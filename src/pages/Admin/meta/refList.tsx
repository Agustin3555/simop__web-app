import { GeneralEntity } from '@/models/config'
import {
  ForView,
  GetFilter,
  GetMetaModel,
  MinSize,
  PropScheme,
  Required,
} from './utils'
import { AutoCombobox, FetchRef, RefFilter } from '../components'
import { AccessorFn, Column, FilterFn } from '@tanstack/react-table'
import { isFieldEnabled } from '.'

/*
  Solamente para controlar los vínculos de uno a muchos que no tengan atributos
  de vinculo y que no sean relaciones ternarias, de lo contrario, se debe convertir
  en un modulo específico.
*/
export class RefListProp implements PropScheme {
  key = ''

  constructor(
    public config: GetMetaModel & {
      // column?: ForView,
      field?: ForView & Required
    },

    public minSize = MinSize.l,
  ) {}

  public get title() {
    const metaModel = this.config.getMetaModel()

    return metaModel.title.plural
  }

  getFieldComponent = (value?: GeneralEntity[], editMode = false) => {
    const { key, config } = this
    const { getMetaModel, field } = config
    const { hidden, required } = field ?? {}

    if (hidden === true) return

    const metaModel = getMetaModel()
    const { title } = metaModel

    return (
      <AutoCombobox
        keyName={key}
        title={title.plural}
        multiple
        initOptions={value}
        {...{ required, editMode, metaModel }}
      />
    )
  }

  getFieldValue = (
    formData: FormData,
    form: HTMLFormElement,
    editMode = false,
  ) => {
    const { key } = this

    const value = formData.getAll(key)

    if (value.length === 0) {
      if (editMode && isFieldEnabled(form, key)) return []
      return
    }

    return value.map(Number)
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

    const entities = row.original[columnId] as undefined | GeneralEntity[]

    if (!entities?.length) return false

    return entities.some(entity => filterValue.includes(String(entity.id)))
  }

  getHeader = (column: Column<GeneralEntity>) => {
    const { key, title, config } = this
    const { getMetaModel } = config

    const metaModel = getMetaModel()

    const { setFilterValue } = column

    const getFilter: GetFilter = ({ options, ...rest }) => (
      <RefFilter
        keyName={key}
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

    const value = item[key] as undefined | GeneralEntity[]

    return (
      value &&
      value.map(item => (
        <FetchRef
          key={item.id}
          id={item.id}
          title={item[selectedSearchMode ?? anchorField]}
          {...{ keyScheme, getOne }}
        />
      ))
    )
  }

  getExcelValue = (item: GeneralEntity) => {
    const { key, config } = this
    const { getMetaModel } = config

    const { anchorField } = getMetaModel()

    const values = item[key] as undefined | GeneralEntity[]

    if (!values || values.length === 0) return

    return values.map(value => value[anchorField]).join(', ')
  }
}
