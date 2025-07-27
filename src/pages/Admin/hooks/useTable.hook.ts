import { useContext } from 'react'
import { TableContext } from '../contexts/table.context'

export const useTable = () => {
  const ctx = useContext(TableContext)
  return ctx
}
