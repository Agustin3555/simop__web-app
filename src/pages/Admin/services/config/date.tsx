import { ForView, PropScheme, Required } from './utils'
import { FormValues } from '@/hooks'
import { Input } from '@/components'

export class DateProp<T extends string> implements PropScheme<T> {
  constructor(
    public key: T,
    public title: string,

    public config?: {
      // column?: ForView,
      field?: ForView & Required
    },
  ) {}

  getFieldComponent = () => {
    const { key, title, config } = this
    const { field } = config ?? {}
    const { hidden, required } = field ?? {}

    if (hidden === true) return

    return <Input key={key} name={key} type="date" {...{ title, required }} />
  }

  getFieldValue = (formValues: FormValues) => {
    const { key, config } = this
    const { field } = config ?? {}
    const { hidden } = field ?? {}

    if (hidden === true) return

    return formValues.get.string(key)
  }
}
