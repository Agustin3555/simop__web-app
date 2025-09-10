import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import {
  ConfigsContext,
  ConfigsContextProps,
} from '../contexts/configs.context'
import { configsEntity } from '../services/localStorage/entities/configs'
import { useMetaModels } from '../hooks'

interface ConfigsProviderProps {
  children: ReactNode
}

export const ConfigsProvider = ({ children }: ConfigsProviderProps) => {
  const { metaModels } = useMetaModels()

  const [configs, setConfigs] = useState<ConfigsContextProps['configs']>(() => {
    try {
      return configsEntity.state
    } catch (error) {
      const currentIdIndex = 0

      const init = Object.fromEntries(
        Object.entries(metaModels).map(([key, { allFields }]) => [
          key,
          {
            currentIdIndex,
            selected: currentIdIndex,
            items: [
              {
                id: currentIdIndex,
                title: 'Por defecto',
                columns: allFields,
              },
            ],
          },
        ]),
      )

      configsEntity.state = init
      return init
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
    }, 2500)

    return clearDebounce
  }, [configs])

  return (
    <ConfigsContext.Provider value={{ configs, setConfigs }}>
      {children}
    </ConfigsContext.Provider>
  )
}
