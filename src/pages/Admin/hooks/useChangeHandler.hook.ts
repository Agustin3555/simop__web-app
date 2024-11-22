import { ChangeEventHandler, useCallback } from 'react'

export const useChangeHandler = (callback: (id: string) => void) => {
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    event => {
      const { id } = event.target

      callback(id)
    },
    [callback]
  )

  return handleChange
}
