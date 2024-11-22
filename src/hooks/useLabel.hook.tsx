import { useMemo } from 'react'

export interface UseLabelProps {
  title: string
  required?: boolean
}

export const useLabel = ({ title, required = false }: UseLabelProps) => {
  const controlTitle = useMemo(
    () => (required ? `${title} (Requerido)` : title),
    [required, title]
  )

  return {
    content: (
      <>
        {title}
        {required && <span>*</span>}
      </>
    ),
    controlTitle,
  }
}
