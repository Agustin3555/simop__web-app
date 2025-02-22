import { useMemo } from 'react'
import { Control } from '@/types'

export const useLabel = ({
  title,
  required,
}: Pick<Control, 'title' | 'required'>) => {
  const inputTitle = useMemo(
    () => (required ? `${title} (requerido)` : title),
    [required, title],
  )

  return {
    labelContent: (
      <>
        {title}
        {required && <span>*</span>}
      </>
    ),
    inputTitle,
  }
}
