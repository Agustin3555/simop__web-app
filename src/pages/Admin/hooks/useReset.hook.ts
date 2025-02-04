import { useCallback, useContext } from 'react'
import { FieldResetFnsContext } from '../contexts'

export const useReset = () => {
  const fns = useContext(FieldResetFnsContext)!

  const reset = useCallback(() => fns.forEach(fn => fn()), [])

  return reset
}
