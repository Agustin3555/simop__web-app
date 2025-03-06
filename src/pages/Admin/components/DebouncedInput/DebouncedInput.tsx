import { useEffect, useState } from 'react'
import { useInputHandler } from '@/pages/Admin/hooks'
import { Input } from '@/components'
import { InputProps } from '@/components/Input/Input'

export interface DebouncedInputProps extends InputProps {
  value: string | number
  handleChange: (value: string | number) => void
}

const DebouncedInput = ({
  keyName,
  title,
  value: initialValue,
  hideLabel = false,
  required = false,
  editMode = false,
  long = 'm',
  handleChange,
  inputHTMLAttrs,
}: DebouncedInputProps) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => setValue(initialValue), [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleChange(value)
    }, 375)

    return () => clearTimeout(timeout)
  }, [value])

  const handleInputChange = useInputHandler(newValue => setValue(newValue))

  return (
    <Input
      {...{ keyName, title, hideLabel, required, editMode, long }}
      inputHTMLAttrs={{
        value: String(value),
        onChange: handleInputChange,
        ...inputHTMLAttrs,
      }}
    />
  )
}

export default DebouncedInput
