import { useContext } from 'react'
import { useStore } from 'zustand'
import { ConfigsState } from './configs.store'
import { ConfigsContext } from './Configs.context'

export function useConfigs<T>(selector: (state: ConfigsState) => T): T {
  const store = useContext(ConfigsContext)
  if (!store) throw new Error()
  return useStore(store, selector)
}
