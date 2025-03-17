import './Option.css'
import { ChangeEventHandler, useMemo } from 'react'
import { BaseComboboxProps, Fields } from '../../BaseCombobox'

interface OptionProps
  extends Pick<BaseComboboxProps, 'keyName' | 'required' | 'multiple'>,
    Pick<
      NonNullable<BaseComboboxProps['searchModePack']>,
      'selectedSearchMode'
    > {
  checked: boolean
  fields: Fields
  handleChange: ChangeEventHandler<HTMLInputElement>
}

const Option = ({
  keyName,
  required,
  multiple,
  checked,
  fields,
  selectedSearchMode,
  handleChange,
}: OptionProps) => {
  const remainingData = useMemo(
    () =>
      Object.entries(fields)
        .filter(([key]) => key !== selectedSearchMode)
        .map(([, value]) => value),
    [fields, selectedSearchMode],
  )

  return (
    <label className="cmp-option">
      <strong className="text">{fields[selectedSearchMode].value}</strong>
      <ul>
        {remainingData.map(({ title, value }) => (
          <li key={title}>
            <strong>{`${title}:`}</strong>
            {value}
          </li>
        ))}
      </ul>
      <input
        type={multiple ? 'checkbox' : 'radio'}
        value={fields.id.value}
        onChange={handleChange}
        name={keyName}
        {...{ checked }}
        // BUG: si se usa 'required' y es true, dará un error al no ser focusable
      />
    </label>
  )
}

export default Option
