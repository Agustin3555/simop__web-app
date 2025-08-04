import { useContext } from 'react'
import { TableContext } from '../contexts/table.context'

export const useTable = () => {
  const ctx = useContext(TableContext)
  if (!ctx) throw new Error()
  return ctx
}
