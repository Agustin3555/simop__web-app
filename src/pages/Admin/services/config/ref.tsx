import { ForView, GetScheme, PropScheme } from './utils'
import { FormValues } from '@/hooks'
import { Combobox } from '@/pages/Admin/components'

export class RefProp<T extends string> implements PropScheme<T> {
  constructor(
    public key: T,
    public title: string,

    public config?: GetScheme & {
      // column?: ForView,
      field?: ForView
    },
  ) {
    this.key = `${key}Id` as T
  }

  getFieldComponent = () => {
    const { key, title, config } = this
    const { getScheme, field } = config ?? {}
    const { hidden } = field ?? {}

    if (hidden === true) return

    const { getForConnect } = getScheme!().service

    return <Combobox key={key} name={key} {...{ title, getForConnect }} />
  }

  getFieldValue = (formValues: FormValues) => {
    const { key, config } = this
    const { field } = config ?? {}
    const { hidden } = field ?? {}

    if (hidden === true) return

    return formValues.get.number(key)
  }
}
