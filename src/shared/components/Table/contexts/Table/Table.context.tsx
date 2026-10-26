import { createContext, ReactNode, useEffect, useState } from 'react'
import { createTableStore, TableProps, TableStore } from './table.store'

export const TableContext = createContext<TableStore | null>(null)

interface TableProviderProps {
  init?: TableProps
  children: ReactNode
}

export const TableProvider = ({ init, children }: TableProviderProps) => {
  const [store] = useState(() => createTableStore(init))

  useEffect(() => {
    if (!init) return

    store.setState({
      ...init,
      columnGraphed: [],
      rowSelection: [],
    })
  }, [init, store])

  return <TableContext.Provider value={store}>{children}</TableContext.Provider>
}
