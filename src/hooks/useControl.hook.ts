import { useMemo, useState } from 'react'
import { Control } from '@/types'

export const useControl = ({
  title,
  required,
}: Pick<Control, 'title' | 'required'>) => {
  const [disabled, setDisabled] = useState(true)

  const inputTitle = useMemo(() => {
    let value = title
    if (required) value += ' (requerido)'

    return value
  }, [required, title])

  return { inputTitle, disabledState: { disabled, setDisabled } }
}
