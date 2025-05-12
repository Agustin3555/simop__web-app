import { createContext } from 'react'
import { MetaModel } from '../services/config'

interface MetaModelContextProps {
  metaModel: MetaModel
}

export const MetaModelContext = createContext<
  MetaModelContextProps | undefined
>(undefined)
