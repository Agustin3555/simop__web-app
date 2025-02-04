import { useContext, useEffect } from 'react'
import { FieldResetFn, FieldResetFnsContext } from '../contexts'

export const useAddFieldReset = (fn: FieldResetFn) => {
  const fns = useContext(FieldResetFnsContext)!

  useEffect(() => {
    fns.push(fn)
  }, [])
}
