import { useContext } from 'react'
import { NavStateContext } from '../contexts/navState.context'

export const useNavState = () => {
  const ctx = useContext(NavStateContext)
  if (!ctx) throw new Error()
  return ctx
}
