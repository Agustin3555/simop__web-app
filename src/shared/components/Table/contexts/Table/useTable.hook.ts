import { useContext } from 'react'
import { useStore } from 'zustand'
import { TableState } from './table.store'
import { TableContext } from './Table.context'

export function useTable<T>(selector: (state: TableState) => T): T {
  const store = useContext(TableContext)
  if (!store) throw new Error()
  return useStore(store, selector)
}
