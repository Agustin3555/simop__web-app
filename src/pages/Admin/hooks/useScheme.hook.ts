import { useContext } from 'react'
import { SchemeContext } from '../contexts'

export const useScheme = () => {
  const context = useContext(SchemeContext)

  return context!.scheme
}
