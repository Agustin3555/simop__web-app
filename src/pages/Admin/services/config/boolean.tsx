import { Color, ForView, PropScheme } from './utils'
import { FormValues } from '@/hooks'
import { Checkbox } from '@/pages/Admin/components'

export class BooleanProp<T extends string> implements PropScheme<T> {
  constructor(
    public key: T,
    public title: string,

    public config?: {
      falseText?: string
      trueText?: string

      // column?: ForView,
      field?: ForView & {
        falseColor?: Color
        trueColor?: Color
      }
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
}
