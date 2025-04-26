import { MutableRefObject, useCallback, useContext } from 'react'
import { FieldResetFnsContext } from '../contexts'

export const useResetForm = (
  formRef: MutableRefObject<HTMLFormElement | null>,
) => {
  const fns = useContext(FieldResetFnsContext)

  const reset = useCallback(() => {
    fns.forEach(fn => fn())
    formRef.current?.reset()
  }, [fns, formRef])

  return reset
}
