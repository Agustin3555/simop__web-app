import { ForView, GetScheme, PropScheme } from './utils'
import { FormValues } from '@/hooks'

export class RefListProp<T extends string> implements PropScheme<T> {
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
}
