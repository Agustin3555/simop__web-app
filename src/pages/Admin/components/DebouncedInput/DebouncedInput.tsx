import { useEffect, useState } from 'react'
import { useInputHandler } from '@/pages/Admin/hooks'
import { Input } from '@/components'
import { InputProps } from '@/components/Input/Input'

export interface DebouncedInputProps extends InputProps {
  value: string
  handleChange: (value: string) => void
}

const DebouncedInput = ({
  keyName,
  title,
  value: initialValue,
  hideLabel = false,
  isRequired = false,
  isEditMode = false,
  handleChange,
  inputHTMLAttrs,
}: DebouncedInputProps) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => handleChange(value), 400)

    return () => clearTimeout(timeout)
  }, [value])

  const handleInputChange = useInputHandler(newValue => setValue(newValue))

  return (
    <Input
      {...{ keyName, title, hideLabel, isRequired, isEditMode }}
      inputHTMLAttrs={{
        ...inputHTMLAttrs,
        value: String(value),
        onChange: handleInputChange,
      }}
    />
  )
}

export default DebouncedInput
