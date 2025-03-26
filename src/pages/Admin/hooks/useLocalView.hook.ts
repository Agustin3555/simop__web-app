import { useContext } from 'react'
import { LocalViewContext } from '../contexts'

export const useLocalView = () => {
  const context = useContext(LocalViewContext)

  return context!
}
