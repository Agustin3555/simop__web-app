import './Option.css'
import { ChangeEventHandler } from 'react'
import { BaseComboboxProps } from '../../BaseCombobox'

export interface OptionProps
  extends Pick<BaseComboboxProps, 'keyName' | 'required' | 'multiple'> {
  id: string
  title: string
  checked: boolean
  fields?: { title: string; value: string }[]
  handleChange: ChangeEventHandler<HTMLInputElement>
}

const Option = ({
  id,
  title,
  checked,
  fields,
  keyName,
  required,
  multiple,
  handleChange,
}: OptionProps) => (
  <label className="cmp-option">
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
      {...{ checked }}
      // BUG: si se usa 'required' y es true, dará un error al no ser focusable
    />
  </label>
)

export default Option
