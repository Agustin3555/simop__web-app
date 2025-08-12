import { createContext } from 'react'
import { META_MODEL_DEFINITIONS } from '../constants/metaModelDefinitions.const'
import { MetaModelKey } from '../constants/metaModelKey.const'
import { MetaModel, MetaModelDefinition } from '../meta/metaModel'

export type MetaModelMap = typeof META_MODEL_DEFINITIONS

export type EntityOf<K extends MetaModelKey> =
  MetaModelMap[K] extends MetaModelDefinition<infer E> ? E : never

export type MetaModelOf<K extends MetaModelKey> = MetaModel<EntityOf<K>>

export type MetaModels = {
  [K in MetaModelKey]: MetaModelOf<K>
}

export interface MetaModelsContextProps {
  metaModels: MetaModels
  allReady: boolean
  getMetaModel: <K extends MetaModelKey>(key: K) => undefined | MetaModelOf<K>
  getMetaModelEntry: <K extends MetaModelKey>(
    key: K,
  ) => {
    metaModel: undefined | MetaModelOf<K>
    ready: boolean
  }
}

export const MetaModelsContext = createContext<
  MetaModelsContextProps | undefined
>(undefined)
