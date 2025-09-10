import { useContext, useEffect } from 'react'
import {
  FieldResetFn,
  FieldResetFnsContext,
} from '../contexts/fieldResetFns.context'

export const useAddFieldReset = (fn: FieldResetFn) => {
  const fns = useContext(FieldResetFnsContext)

  useEffect(() => {
    fns.push(fn)
  }, [fns])
}
