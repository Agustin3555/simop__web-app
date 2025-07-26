import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { MetaModelKey } from '../constants/metaModelKey.const'
import { buildMetaModel, MetaModel } from '../meta/metaModel'
import { META_MODEL_DEFINITIONS } from '../constants/metaModelDefinitions.const'

export type MetaModels = Record<MetaModelKey, MetaModel>

export interface MetaModelsContextProps {
  metaModels: MetaModels
  getMetaModel: (key: MetaModelKey) => undefined | MetaModel
  addMetaModel: (key: MetaModelKey, metaModel: MetaModel) => void
}

export const MetaModelsContext = createContext<
  MetaModelsContextProps | undefined
>(undefined)

interface MetaModelsProviderProps {
  children: ReactNode
}

const MAX_RETRIES = 5

export const MetaModelsProvider = ({ children }: MetaModelsProviderProps) => {
  const [metaModels, setMetaModels] = useState({} as MetaModels)
  const [retries, setRetries] = useState({} as Record<MetaModelKey, number>)

  const getMetaModel = useCallback<MetaModelsContextProps['getMetaModel']>(
    key => metaModels[key] ?? undefined,
    [metaModels],
  )

  const addMetaModel = useCallback<MetaModelsContextProps['addMetaModel']>(
    (key, metaModel) => setMetaModels(prev => ({ ...prev, [key]: metaModel })),
    [],
  )

  useEffect(() => {
    const interval = setInterval(() => {
      Object.entries(META_MODEL_DEFINITIONS).forEach(([key, definition]) => {
        const metaKey = key as MetaModelKey
        const alreadyExists = !!metaModels[metaKey]
        const attempts = retries[metaKey] ?? 0

        if (alreadyExists || attempts >= MAX_RETRIES) return

        try {
          const metaModel = buildMetaModel(definition, getMetaModel)
          addMetaModel(metaKey, metaModel)
        } catch (error) {
          console.warn(`Failed to build metaModel: ${metaKey}`, error)

          setRetries(prev => ({ ...prev, [metaKey]: attempts + 1 }))
        }
      })
    }, 250)

    return () => clearInterval(interval)
  }, [metaModels, retries, addMetaModel, getMetaModel])

  return (
    <MetaModelsContext.Provider
      value={{ metaModels, getMetaModel, addMetaModel }}
    >
      {children}
    </MetaModelsContext.Provider>
  )
}
