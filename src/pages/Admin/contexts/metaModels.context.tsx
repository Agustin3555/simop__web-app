import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { MetaModelKey } from '../constants/metaModelKey.const'
import { buildMetaModel, MetaModel } from '../meta/metaModel'
import { META_MODEL_DEFINITIONS } from '../constants/metaModelDefinitions.const'

export type MetaModels = Record<MetaModelKey, MetaModel>

export interface MetaModelsContextProps {
  metaModels: MetaModels
  allReady: boolean
  getMetaModel: (key: MetaModelKey) => undefined | MetaModel
  getMetaModelEntry: (key: MetaModelKey) => {
    metaModel: undefined | MetaModel
    ready: boolean
  }
}

export const MetaModelsContext = createContext<
  MetaModelsContextProps | undefined
>(undefined)

interface MetaModelsProviderProps {
  children: ReactNode
}

export const MetaModelsProvider = ({ children }: MetaModelsProviderProps) => {
  const [metaModels, setMetaModels] = useState({} as MetaModels)
  const [isReady, setIsReady] = useState({} as Record<MetaModelKey, boolean>)

  const allReady = useMemo(() => {
    const keys = Object.keys(META_MODEL_DEFINITIONS) as MetaModelKey[]
    return keys.every(key => isReady[key])
  }, [isReady])

  const getMetaModel = useCallback<MetaModelsContextProps['getMetaModel']>(
    key => metaModels[key],
    [metaModels],
  )

  const getMetaModelEntry = useCallback<
    MetaModelsContextProps['getMetaModelEntry']
  >(
    key => ({ metaModel: metaModels[key], ready: !!isReady[key] }),
    [metaModels, isReady],
  )

  const tryBuildMetaModels = useCallback(() => {
    Object.entries(META_MODEL_DEFINITIONS).forEach(([keyStr, definition]) => {
      const key = keyStr as MetaModelKey

      // Si ya está ready, se ignora
      if (isReady[key]) return

      const { ready, data } = buildMetaModel(definition, getMetaModel)

      setMetaModels(prev => ({ ...prev, [key]: data }))
      setIsReady(prev => ({ ...prev, [key]: ready }))
    })
  }, [getMetaModel, isReady])

  useEffect(() => {
    if (!allReady) tryBuildMetaModels()
  }, [allReady, tryBuildMetaModels])

  return (
    <MetaModelsContext.Provider
      value={{ metaModels, allReady, getMetaModel, getMetaModelEntry }}
    >
      {children}
    </MetaModelsContext.Provider>
  )
}
