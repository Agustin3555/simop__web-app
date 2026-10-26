import { useContext } from 'react'
import { TableDefContext } from '../contexts/tableDef.context'

export const useTableDef = () => {
  const ctx = useContext(TableDefContext)
  if (!ctx) throw new Error()
  return ctx
}
