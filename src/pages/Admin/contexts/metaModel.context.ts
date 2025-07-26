import { createContext } from 'react'
import { MetaModel } from '../meta/metaModel'

export const MetaModelContext = createContext<MetaModel | undefined>(undefined)
