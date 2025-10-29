import './Option.css'
import { ChangeEventHandler } from 'react'
import { BaseComboboxProps } from '../../../../BaseCombobox'

export interface OptionProps
  extends Pick<BaseComboboxProps, 'keyName' | 'multiple'> {
  id: string
  title: string
  checked: boolean
  fields?: { title: string; value: string }[]
  isStatic?: boolean
  handleChange: ChangeEventHandler<HTMLInputElement>
}

const Option = ({
  id,
  title,
  checked,
  fields,
  keyName,
  multiple,
  isStatic = false,
  handleChange,
}: OptionProps) => (
  <label className="cmp-option" hidden={isStatic}>
    <strong className="text">{title}</strong>
    {fields && (
      <ul>
        {fields.map(({ title, value }) => (
          <li className="text" key={title}>
            <strong>{`${title}:`}</strong>
            {value}
          </li>
        ))}
      </ul>
    )}
    <input
      type={multiple ? 'checkbox' : 'radio'}
      value={id}
      onChange={handleChange}
      name={keyName}
      checked={isStatic ? true : checked}
    />
  </label>
)

export default Option
