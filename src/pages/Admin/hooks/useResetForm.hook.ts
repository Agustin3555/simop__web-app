import { RefObject, useCallback, useContext } from 'react'
import { FieldResetFnsContext } from '../contexts/fieldResetFns.context'

export const useResetForm = (formRef: RefObject<HTMLFormElement | null>) => {
  const fns = useContext(FieldResetFnsContext)

  const reset = useCallback(() => {
    fns.forEach(fn => fn())
    formRef.current?.reset()
  }, [fns, formRef])

  return reset
}
