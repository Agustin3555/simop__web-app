import { ChangeEventHandler, useCallback } from 'react'

export const useInputHandler = (
  callback: (value: string, checked: boolean) => void,
) => {
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    event => {
      const { value, checked } = event.target

      callback(value, checked)
    },
    [callback],
  )

  return handleChange
}
