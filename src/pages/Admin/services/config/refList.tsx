import { Entity, EntityKey } from '@/services/config'
import { ForView, GetScheme, PropScheme, Required } from './utils'
import { Combobox, FetchRef } from '../../components'
import { Ref } from '@/types'
import { Column, Row } from '@tanstack/react-table'

/*
  Solamente para controlar los vínculos de uno a muchos que no tengan atributos
  de vinculo y que no sean relaciones ternarias, si lo es, se debe convertir en
  un modulo aparte.
*/
export class RefListProp<T extends EntityKey> implements PropScheme {
  constructor(
    public key: T,

    public config: GetScheme & {
      // column?: ForView,
      field?: ForView & Required
    },
  ) {}

  getFieldComponent = () => {
    const { key, config } = this
    const { getScheme, field } = config
    const { hidden, required } = field ?? {}

    if (hidden === true) return

    const scheme = getScheme()

    return <Combobox key={key} name={key} multiple {...{ scheme, required }} />
  }

  getFieldValue = (formData: FormData) => {
    const { key, config } = this
    const { field } = config ?? {}
    const { hidden } = field ?? {}

    if (hidden === true) return

    const value = formData.getAll(key)

    if (value.length === 0) return

    return value.map(Number)
  }

  getHeader = (column: Column<Entity>) => {
    const { config } = this
    const { getScheme } = config
    const { title, refAnchorField } = getScheme()

    const filter = undefined

    return { title: title.plural, subtitle: refAnchorField, filter }
  }

  getCellComponent = (row: Row<Entity>) => {
    const { key, config } = this
    const { getScheme } = config ?? {}

    const { getOne } = getScheme().service
    const value = row.original[key] as Ref[]

    return (
      <div className="items">
        {value.map(item => (
          <FetchRef {...item} {...{ getOne }} />
        ))}
      </div>
    )
  }
}
