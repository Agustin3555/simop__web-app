import { useContext } from 'react'
import { TableContext } from '../contexts'

export const useTable = () => {
  const ctx = useContext(TableContext)
  return ctx
}
