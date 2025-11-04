import { useMemo, useState } from 'react'
import { InputField } from '@/types'

type UseInputFieldProps = Pick<InputField, 'title' | 'isRequired'>

export const useInputField = ({ title, isRequired }: UseInputFieldProps) => {
  const [disabled, setDisabled] = useState(true)

  const inputTitle = useMemo(() => {
    let value = title
    if (isRequired) value += ' (requerido)'
    return value
  }, [isRequired, title])

  return { inputTitle, disabledState: { disabled, setDisabled } }
}
