import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { MetaModelKey } from '../constants/metaModelKey.const'
import { buildMetaModel, MetaModelDefinition } from '../meta/metaModel'
import { META_MODEL_DEFINITIONS } from '../constants/metaModelDefinitions.const'
import {
  MetaModels,
  MetaModelsContext,
  MetaModelsContextProps,
} from '../contexts/metaModels.context'

interface MetaModelsProviderProps {
  children: ReactNode
}

export const MetaModelsProvider = ({ children }: MetaModelsProviderProps) => {
  const [metaModels, setMetaModels] = useState({} as MetaModels)
  const [isReady, setIsReady] = useState({} as Record<MetaModelKey, boolean>)

  const allReady = useMemo(() => {
    const keys = Object.keys(META_MODEL_DEFINITIONS) as MetaModelKey[]
    return keys.every(k => isReady[k])
  }, [isReady])

  const getMetaModel = useCallback<MetaModelsContextProps['getMetaModel']>(
    k => metaModels[k],
    [metaModels],
  )

  const getMetaModelEntry = useCallback<
    MetaModelsContextProps['getMetaModelEntry']
  >(
    k => ({ metaModel: metaModels[k], ready: !!isReady[k] }),
    [metaModels, isReady],
  )

  const tryBuildMetaModels = useCallback(() => {
    Object.entries(META_MODEL_DEFINITIONS).forEach(([keyStr, definition]) => {
      const key = keyStr as MetaModelKey

      if (isReady[key]) return

      const { ready, data } = buildMetaModel(
        definition as unknown as MetaModelDefinition,
        getMetaModel,
      )

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
