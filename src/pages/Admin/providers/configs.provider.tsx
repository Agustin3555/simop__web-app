import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import {
  ConfigsContext,
  ConfigsContextProps,
} from '../contexts/configs.context'
import { configsEntity } from '../services/localStorage/entities/configs'
import { useMetaModels } from '../hooks'

const currentIdIndex = 0

const buildDefaultConfig = (key: string, columns: string[]) => [
  key,
  {
    currentIdIndex,
    selected: currentIdIndex,
    items: [{ id: currentIdIndex, title: 'Por defecto', columns }],
  },
]

interface ConfigsProviderProps {
  children: ReactNode
}

export const ConfigsProvider = ({ children }: ConfigsProviderProps) => {
  const { metaModels } = useMetaModels()

  const [configs, setConfigs] = useState<ConfigsContextProps['configs']>(() => {
    try {
      const state = configsEntity.state

      const updatedState = Object.fromEntries(
        Object.entries(metaModels).map(([key, { allFields }]) => {
          const existingConfig = state[key]

          if (existingConfig) {
            const sanitizedItems = existingConfig.items.map(item => ({
              ...item,
              columns: item.columns.filter(v => allFields.includes(v as any)),
            }))

            return [key, { ...existingConfig, items: sanitizedItems }]
          }

          return buildDefaultConfig(key, allFields)
        }),
      )

      configsEntity.state = updatedState
      return updatedState
    } catch (error) {
      const defaultState = Object.fromEntries(
        Object.entries(metaModels).map(([key, { allFields }]) =>
          buildDefaultConfig(key, allFields),
        ),
      )

      configsEntity.state = defaultState
      return defaultState
    }
  })

  const debounceRef = useRef<number>(null)

  const clearDebounce = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
  }, [])

  useEffect(() => {
    clearDebounce()

    debounceRef.current = setTimeout(() => {
      configsEntity.state = configs
    }, 2000)

    return clearDebounce
  }, [configs])

  return (
    <ConfigsContext.Provider value={{ configs, setConfigs }}>
      {children}
    </ConfigsContext.Provider>
  )
}
