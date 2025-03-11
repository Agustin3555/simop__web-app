import { Entity } from '@/services/config'
import { Color, ForView, PropScheme } from './utils'
import { Checkbox } from '../../components'
import { Column, Row } from '@tanstack/react-table'
import { classList } from '@/helpers'

export class BooleanProp implements PropScheme {
  key = ''

  constructor(
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

  getFieldComponent = (value?: boolean, editMode = false) => {
    const { key, title, config } = this
    const { falseText, trueText, field } = config ?? {}
    const { hidden } = field ?? {}

    if (hidden === true) return

    return (
      <Checkbox
        keyName={key}
        {...{ title, value, editMode, falseText, trueText }}
      />
    )
  }

  getFieldValue = (formData: FormData) => {
    const { key, config } = this
    const { field } = config ?? {}
    const { hidden } = field ?? {}

    if (hidden === true) return

    return formData.get(key) === 'on'
  }

  getHeader = (column: Column<Entity>) => {
    const { title } = this

    const filter = undefined

    return { title, filter }
  }

  getCellComponent = (row: Row<Entity>) => {
    const { key, config } = this
    const { falseText = 'No', trueText = 'Si', column } = config ?? {}
    const { falseColor = 'grey', trueColor = 'green' } = column ?? {}

    const value = row.original[key] as undefined | boolean

    return (
      value !== undefined && (
        <p className={classList('highlighted', value ? trueColor : falseColor)}>
          {value ? trueText : falseText}
        </p>
      )
    )
  }
}
