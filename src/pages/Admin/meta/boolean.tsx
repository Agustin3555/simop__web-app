import { GeneralEntity } from '@/models/config'
import { Color, ForView, GetFilter, MinSize, PropScheme } from './utils'
import { BooleanFilter, Checkbox } from '../components'
import { Column } from '@tanstack/react-table'
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

    public minSize = MinSize.xs,
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

  getFieldValue = (
    formData: FormData,
    form: HTMLFormElement,
    editMode = false,
  ) => {
    const { key } = this

    if (editMode && !formData.has(key)) return

    const value = formData.get(key)

    return value === 'on'
  }

  getHeader = (column: Column<GeneralEntity>) => {
    const { key, title, config } = this
    const { falseText = 'No', trueText = 'Si' } = config ?? {}

    const { setFilterValue } = column

    const getFilter: GetFilter = ({ getFilterValue }) => (
      <BooleanFilter
        keyName={key}
        {...{ title, falseText, trueText, getFilterValue, setFilterValue }}
      />
    )

    return { title, getFilter }
  }

  getValueComponent = (item: GeneralEntity) => {
    const { key, config } = this
    const { falseText = 'No', trueText = 'Si', column } = config ?? {}
    const { falseColor = 'grey', trueColor = 'green' } = column ?? {}

    const value = item[key] as undefined | boolean

    return (
      value !== undefined && (
        <p className={classList('highlighted', value ? trueColor : falseColor)}>
          {value ? trueText : falseText}
        </p>
      )
    )
  }

  getExcelValue = (item: GeneralEntity) => {
    const { key, config } = this
    const { falseText = 'No', trueText = 'Sí' } = config ?? {}

    const value = item[key] as boolean | undefined

    if (value === undefined) return

    return value ? trueText : falseText
  }
}
