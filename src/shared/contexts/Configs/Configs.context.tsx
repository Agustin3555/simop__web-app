import { createContext, ReactNode, useState } from 'react'
import { createConfigsStore, ConfigsStore } from './configs.store'
import { useTableDef } from '@/pages/Admin/hooks/useTableDef.hook'

export const ConfigsContext = createContext<ConfigsStore | undefined>(undefined)

interface ConfigsProviderProps {
  children: ReactNode
}

export const ConfigsProvider = ({ children }: ConfigsProviderProps) => {
  const {
    tableDef: { key, columnDefs },
  } = useTableDef()

  const [store] = useState(() =>
    createConfigsStore({
      tableKey: key,
      columnKeys: columnDefs.map(({ key }) => key),
    }),
  )

  return (
    <ConfigsContext.Provider value={store}>{children}</ConfigsContext.Provider>
  )
}
