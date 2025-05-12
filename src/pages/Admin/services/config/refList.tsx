import { GeneralEntity } from '@/models/config'
import { ForView, GetMetaModel, MinSize, PropScheme, Required } from './utils'
import { AutoCombobox, FetchRef } from '../../components'
import { Column } from '@tanstack/react-table'
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
    const scheme = this.config.getMetaModel()

    return scheme.title.plural
  }

  getFieldComponent = (value?: GeneralEntity[], editMode = false) => {
    const { key, config } = this
    const { getMetaModel: getScheme, field } = config
    const { hidden, required } = field ?? {}

    if (hidden === true) return

    const scheme = getScheme()
    const { title } = scheme

    return (
      <AutoCombobox
        keyName={key}
        title={title.singular}
        multiple
        initOptions={value}
        {...{ required, editMode, metaModel: scheme }}
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
      if (editMode && isFieldEnabled(form, key)) return null
      return
    }

    return value.map(Number)
  }

  getHeader = (column: Column<GeneralEntity>) => {
    const { title, config } = this
    const { getMetaModel: getScheme } = config

    const scheme = getScheme()
    const { anchorField } = scheme

    const getFilter = () => undefined

    return { title, getFilter }
  }

  getValueComponent = (item: GeneralEntity) => {
    const { key, config } = this
    const { getMetaModel: getScheme } = config ?? {}

    const { service, anchorField, key: keyScheme } = getScheme()
    const { getOne } = service

    const value = item[key] as undefined | GeneralEntity[]

    return (
      value &&
      value.map(item => (
        <FetchRef
          key={item.id}
          id={item.id}
          title={item[anchorField]}
          {...{ keyScheme, getOne }}
        />
      ))
    )
  }

  getExcelValue = (item: GeneralEntity) => {
    const { key, config } = this
    const { getMetaModel: getScheme } = config

    const { anchorField } = getScheme()

    const values = item[key] as undefined | GeneralEntity[]

    if (!values || values.length === 0) return

    return values.map(value => value[anchorField]).join(', ')
  }
}
