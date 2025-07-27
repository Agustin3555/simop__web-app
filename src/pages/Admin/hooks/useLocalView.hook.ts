import { useContext } from 'react'
import { LocalViewContext } from '../contexts/localViewLocation.context'

export const useLocalView = () => {
  const context = useContext(LocalViewContext)

  return context!
}
