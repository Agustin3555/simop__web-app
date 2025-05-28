import { createContext } from 'react'
import { MetaModel } from '../meta'

interface MetaModelContextProps {
  metaModel: MetaModel
}

export const MetaModelContext = createContext<
  MetaModelContextProps | undefined
>(undefined)
