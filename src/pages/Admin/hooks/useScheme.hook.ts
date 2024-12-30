import { useContext } from 'react'
import { SchemeContext } from '../contexts'
import { Scheme } from '@/models/config'

export const useScheme = () => {
  const context = useContext(SchemeContext)

  return context!.scheme as Scheme<{ id?: number }>
}
