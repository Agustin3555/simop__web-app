import './InputCombobox.css'
import { useCallback, useState } from 'react'
import { ComboboxProps, useCombobox, useInputHandler } from '../../hooks'
import { Input } from '@/components'
import { ComboboxLayout } from '..'

const InputCombobox = ({
  name,
  title,
  required = false,
  getForConnectProvider,
  long,
}: ComboboxProps) => {
  const [value, setValue] = useState('')
  const { basicProps, sortedOptions } = useCombobox({
    title,
    required,
    getForConnectProvider,
    long,
  })

  const handleInputChange = useInputHandler(newValue => setValue(newValue))

  const handleOptionClick = useCallback(
    (value: string) => () => setValue(value),
    [],
  )

  return (
    <ComboboxLayout
      {...{ basicProps }}
      selection={
        // BUG: al hacer focus se dispara el click del header
        <Input
          {...{ name, title, value, required }}
          hideLabel
          onChange={handleInputChange}
        />
      }
      fieldset={
        <fieldset className="drop-down">
          {sortedOptions?.map(({ id, title }) => (
            <div key={id} className="option" onClick={handleOptionClick(title)}>
              {title}
            </div>
          ))}
        </fieldset>
      }
    />
  )
}

export default InputCombobox
