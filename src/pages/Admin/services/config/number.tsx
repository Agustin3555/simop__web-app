import { ForView, PropScheme, Required } from './utils'
import { FormValues } from '@/hooks'
import { Input } from '@/components'

export class NumberProp<T extends string> implements PropScheme<T> {
  constructor(
    public key: T,
    public title: string,

    public config?: {
      pre?: string
      sub?: string

      // column?: ForView,
      field?: ForView &
        Required & {
          min?: number
          max?: number
        }
    },
  ) {}

  getFieldComponent = () => {
    const { key, title, config } = this
    const { field } = config ?? {}
    const { hidden, required } = field ?? {}

    if (hidden === true) return

    return <Input key={key} name={key} type="number" {...{ title, required }} />
  }

  getFieldValue = (formValues: FormValues) => {
    const { key, config } = this
    const { field } = config ?? {}
    const { hidden } = field ?? {}

    if (hidden === true) return

    return formValues.get.number(key)
  }
}
