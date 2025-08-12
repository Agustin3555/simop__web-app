import { useContext } from 'react'
import { LocalViewContext } from '../contexts/localViewLocation.context'

export const useLocalView = () => {
  const ctx = useContext(LocalViewContext)
  if (!ctx) throw new Error()
  return ctx
}
