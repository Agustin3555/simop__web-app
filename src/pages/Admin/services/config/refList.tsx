import { Entity, EntityKey } from '@/services/config'
import { ForView, GetScheme, PropScheme } from './utils'
import { FormValues } from '@/hooks'
import { FetchRef } from '../../components'
import { Ref } from '@/types'
import { Row } from '@tanstack/react-table'

/*
  TODO: Solamente para visualizar los vínculos de uno a muchos que no tengan
  atributos de vinculo y que no sean relaciones ternarias, si lo es, se debe
  convertir en un modulo aparte.
*/

export class RefListProp<T extends EntityKey> implements PropScheme {
  constructor(
    public key: T,
    public title: string,

    public config?: GetScheme & {
      // column?: ForView,
      field?: ForView
    },
  ) {}

  getFieldComponent = () => {
    const { key, title, config } = this
    const { getScheme, field } = config ?? {}
    const { hidden } = field ?? {}

    if (hidden === true) return

    const { getForConnect } = getScheme!().service

    return undefined
  }

  getFieldValue = (formValues: FormValues) => {
    const { key, config } = this
    const { field } = config ?? {}
    const { hidden } = field ?? {}

    if (hidden === true) return

    return undefined
  }

  getCellComponent = (row: Row<Entity>) => {
    const { key, config } = this
    const { getScheme } = config ?? {}

    const { getOne } = getScheme!().service
    const value = row.original[key] as Ref[]

    return (
      <div>
        {value.map(item => (
          <FetchRef {...item} {...{ getOne }} />
        ))}
      </div>
    )
  }
}
