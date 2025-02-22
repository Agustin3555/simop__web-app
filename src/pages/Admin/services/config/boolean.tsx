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

  getFieldComponent = () => {
    const { key, title, config } = this
    const { falseText, trueText, field } = config ?? {}
    const { hidden } = field ?? {}

    if (hidden === true) return

    return <Checkbox key={key} name={key} {...{ title, falseText, trueText }} />
  }

  getFieldValue = (formData: FormData, form: HTMLFormElement) => {
    const { key, config } = this
    const { field } = config ?? {}
    const { hidden } = field ?? {}

    if (hidden === true) return

    // const checkbox = form.querySelector<HTMLInputElement>(
    //   `input[type="checkbox"][name="${key}"]`,
    // )
    // if (!checkbox) return

    // const useValue = checkbox.dataset.useValue === 'true'
    // if (!useValue) return

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

    const value = row.original[key] as boolean

    return (
      <p className={classList('highlighted', value ? trueColor : falseColor)}>
        {value ? trueText : falseText}
      </p>
    )
  }
}
