import { InputHTMLAttributes, useEffect, useState } from 'react'
import { useInputHandler } from '@/pages/Admin/hooks'
import { Input } from '@/components'

export interface DebouncedInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string | number
  onChange: (value: string | number) => void
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  ...rest
}: DebouncedInputProps) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, 375)

    return () => clearTimeout(timeout)
  }, [value])

  const handleChange = useInputHandler(newValue => setValue(newValue))

  return <Input {...{ value }} hideLabel onChange={handleChange} {...rest} />
}

export default DebouncedInput
