import { createContext, ReactNode, useState } from 'react'
import { createTableStore, TableStore } from './table.store'

export const TableContext = createContext<TableStore | null>(null)

interface TableProviderProps {
  children: ReactNode
  initialCount?: number
}

export const TableProvider = ({
  children,
  initialCount,
}: TableProviderProps) => {
  const [store] = useState(() => createTableStore())

  return <TableContext.Provider value={store}>{children}</TableContext.Provider>
}
