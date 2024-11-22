import { ChangeEventHandler, useCallback } from 'react'

export const useInputHandler = (callback: (value: string) => void) => {
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    event => {
      const { value } = event.target

      callback(value)
    },
    [callback]
  )

  return handleChange
}
