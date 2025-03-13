import { Entity } from '@/services/config'
import { ForView, GetScheme, PropScheme, Required } from './utils'
import { Combobox, FetchRef } from '../../components'
import { Column, Row } from '@tanstack/react-table'
import { getFlatProps } from './scheme'
import { fn } from '.'

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
  ) {}

  getFieldComponent = (value?: Partial<Entity>[], editMode = false) => {
    const { key, config } = this
    const { getScheme, field } = config
    const { hidden, required } = field ?? {}

    if (hidden === true) return

    const scheme = getScheme()
    const { title } = scheme

    return (
      <Combobox
        keyName={key}
        title={title.singular}
        multiple
        {...(!editMode && { required })}
        {...{ value, editMode, scheme }}
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
      if (editMode && fn(form, key)) return null
      return
    }

    return value.map(Number)
  }

  getHeader = (column: Column<Entity>) => {
    const { config } = this
    const { getScheme } = config

    const scheme = getScheme()
    const { title, anchorField } = scheme
    const flatProps = getFlatProps(scheme)

    const filter = undefined

    return {
      title: title.plural,
      subtitle: flatProps[anchorField].title,
      filter,
    }
  }

  getCellComponent = (row: Row<Entity>) => {
    const { key, config } = this
    const { getScheme } = config ?? {}

    const { service, anchorField } = getScheme()
    const { getOne } = service

    const value = row.original[key] as undefined | any[]

    return (
      value && (
        <div className="items">
          {value.map(item => (
            <FetchRef id={item.id} title={item[anchorField]} {...{ getOne }} />
          ))}
        </div>
      )
    )
  }
}
