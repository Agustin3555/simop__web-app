import './Option.css'
import { ChangeEventHandler } from 'react'
import { useComboboxCore } from '@/pages/Admin/hooks'
import { classList } from '@/helpers'

interface SafeValueProps {
  value?: string
}

const SafeValue = ({ value }: SafeValueProps) => (
  <span className={classList('text', { 'is-undefined': value === undefined })}>
    {value ?? 'Indefinido'}
  </span>
)

export interface OptionProps {
  id: string
  isChecked: boolean
  isStatic?: boolean
  title?: string
  fields?: { title: string; value?: string }[]
  handleChange: ChangeEventHandler<HTMLInputElement>
}

const Option = ({
  id,
  isChecked,
  isStatic = false,
  title,
  fields,
  handleChange,
}: OptionProps) => {
  const { keyName, isMultiple } = useComboboxCore()

  return (
    <label className="cmp-option" hidden={isStatic}>
      <SafeValue value={title} />
      {fields && (
        <ul>
          {fields.map(({ title, value }) => (
            <li key={title}>
              <strong>{`${title}:`}</strong>
              <SafeValue {...{ value }} />
            </li>
          ))}
        </ul>
      )}
      <input
        type={isMultiple ? 'checkbox' : 'radio'}
        name={keyName}
        value={id}
        checked={isStatic ? true : isChecked}
        onChange={handleChange}
      />
    </label>
  )
}

export default Option
