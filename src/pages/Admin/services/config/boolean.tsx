import { Entity, EntityKey } from '@/services/config'
import { Color, ForView, PropScheme } from './utils'
import { FormValues } from '@/hooks'
import { Checkbox } from '../../components'
import { Row } from '@tanstack/react-table'
import { classList } from '@/helpers'

export class BooleanProp<T extends EntityKey> implements PropScheme {
  constructor(
    public key: T,
    public title: string,

    public config?: {
      falseText?: string
      trueText?: string

      column?: ForView & {
        falseColor?: Color
        trueColor?: Color
      }
      field?: ForView
    },
  ) {}

  getFieldComponent = () => {
    const { key, title, config } = this
    const { falseText, trueText, field } = config ?? {}
    const { hidden } = field ?? {}

    if (hidden === true) return

    return <Checkbox key={key} name={key} {...{ title, falseText, trueText }} />
  }

  getFieldValue = (formValues: FormValues) => {
    const { key, config } = this
    const { field } = config ?? {}
    const { hidden } = field ?? {}

    if (hidden === true) return

    return formValues.get.boolean(key)
  }

  getCellComponent = (row: Row<Entity>) => {
    const { key, config } = this
    const { falseText = 'No', trueText = 'Si', column } = config ?? {}
    const { falseColor = 'grey', trueColor = 'green' } = column ?? {}

    const value = row.original[key] as boolean

    return (
      <p className={classList('highlighted', value ? trueColor : falseColor)}>
        {value ? trueText : falseText}
      </p>
    )
  }
}
