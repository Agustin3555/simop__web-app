import { ReactNode, useCallback, useEffect, useState } from 'react'
import {
  ConfigsContext,
  ConfigsContextProps,
} from '../contexts/configs.context'
import { configsEntity } from '../services/localStorage/entities/configs'
import { useMetaModel } from '../hooks'

export const ALL_CONFIG_KEY = 'all'

interface ConfigsProviderProps {
  children: ReactNode
}

export const ConfigsProvider = ({ children }: ConfigsProviderProps) => {
  const [configs, setConfigs] = useState<ConfigsContextProps['configs']>({})
  const { key: metaModelKey } = useMetaModel()

  const add = useCallback<ConfigsContextProps['add']>(
    baseConfig =>
      setConfigs(prev => {
        const newState = structuredClone(prev)

        newState[metaModelKey].push({
          id: crypto.randomUUID(),
          selected: false,
          ...baseConfig,
        })

        return newState
      }),
    [],
  )

  const toggleSelection = useCallback<ConfigsContextProps['toggleSelection']>(
    id =>
      setConfigs(prev => {
        const newState = structuredClone(prev)

        newState[metaModelKey].find(v => v.selected === true)!.selected = false
        newState[metaModelKey].find(v => v.id === id)!.selected = true

        return newState
      }),
    [],
  )

  useEffect(() => {
    const isVoid = !configs[metaModelKey]

    if (isVoid)
      setConfigs(prev => {
        const newState = structuredClone(prev)

        return {
          [metaModelKey]: [
            { id: ALL_CONFIG_KEY, selected: true, title: 'Todos', columns: [] },
          ],
          ...newState,
        }
      })
  }, [configs])

  useEffect(() => {
    configsEntity.state = configs
  }, [configs])

  return (
    <ConfigsContext.Provider value={{ configs, add, toggleSelection }}>
      {children}
    </ConfigsContext.Provider>
  )
}
