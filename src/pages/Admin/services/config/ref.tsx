import { Entity, EntityKey } from '@/services/config'
import { ForView, GetScheme, PropScheme } from './utils'
import { FormValues } from '@/hooks'
import { Combobox, FetchRef } from '../../components'
import { Ref } from '@/types'
import { AccessorFn, Row } from '@tanstack/react-table'

export class RefProp<T extends EntityKey> implements PropScheme {
  constructor(
    public key: T,

    public config: GetScheme & {
      // column?: ForView,
      field?: ForView
    },
  ) {
    this.key = `${key}Id` as T
  }

  getFieldComponent = () => {
    const { key, config } = this
    const { getScheme, field } = config
    const { hidden } = field ?? {}

    if (hidden === true) return

    const { service, title } = getScheme()
    const { getForConnect } = service

    return (
      <Combobox
        key={key}
        name={key}
        title={title.singular}
        {...{ getForConnect }}
      />
    )
  }

  getFieldValue = (formValues: FormValues) => {
    const { key, config } = this
    const { field } = config ?? {}
    const { hidden } = field ?? {}

    if (hidden === true) return

    return formValues.get.number(key)
  }

  accessorFn: AccessorFn<Entity> = row => {
    const { key } = this

    const { title } = (row[key] as Ref) ?? {}

    return title ?? ''
  }

  getCellComponent = (row: Row<Entity>) => {
    const { key, config } = this
    const { getScheme } = config ?? {}

    const { getOne } = getScheme!().service
    const value = row.original[key] as Ref

    return <FetchRef {...value} {...{ getOne }} />
  }
}
