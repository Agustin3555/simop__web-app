import { Entity } from '@/services/config'
import { ForView, GetScheme, MinSize, PropScheme, Required } from './utils'
import { AutoCombobox, FetchRef } from '../../components'
import { Column, Row } from '@tanstack/react-table'
import { getFlatProps } from './scheme'
import { isFieldEnabled } from '.'

/*
  Solamente para controlar los vínculos de uno a muchos que no tengan atributos
  de vinculo y que no sean relaciones ternarias, de lo contrario, se debe convertir
  en un modulo específico.
*/
export class RefListProp implements PropScheme {
  key = ''

  constructor(
    public config: GetScheme & {
      // column?: ForView,
      field?: ForView & Required
    },

    public minSize = MinSize.l,
  ) {}

  public get title() {
    const scheme = this.config.getScheme()

    return scheme.title.plural
  }

  getFieldComponent = (value?: Entity[], editMode = false) => {
    const { key, config } = this
    const { getScheme, field } = config
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
        {...{ required, editMode, scheme }}
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

  getHeader = (column: Column<Entity>) => {
    const { title, config } = this
    const { getScheme } = config

    const scheme = getScheme()
    const { anchorField } = scheme
    const flatProps = getFlatProps(scheme)

    const filter = undefined

    return {
      title,
      subtitle: flatProps[anchorField].title,
      filter,
    }
  }

  getCellComponent = (row: Row<Entity>) => {
    const { key, config } = this
    const { getScheme } = config ?? {}

    const { service, anchorField } = getScheme()
    const { getOne } = service

    const value = row.original[key] as undefined | Entity[]

    return (
      value &&
      value.map(item => (
        <FetchRef
          key={item.id}
          id={item.id}
          title={item[anchorField]}
          {...{ getOne }}
        />
      ))
    )
  }

  getExcelValue = (item: Entity) => {
    const { key, config } = this
    const { getScheme } = config

    const { anchorField } = getScheme()

    const values = item[key] as undefined | Entity[]

    if (!values || values.length === 0) return

    return values.map(value => value[anchorField]).join(', ')
  }
}
