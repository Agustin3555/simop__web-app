import { useContext } from 'react'
import { NavStateContext } from '../contexts'

export const useNavState = () => {
  const ctx = useContext(NavStateContext)
  if (!ctx) throw new Error()
  return ctx
}
