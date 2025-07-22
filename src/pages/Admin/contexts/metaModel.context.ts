import { createContext } from 'react'
import { MetaModel } from '../meta'

export const MetaModelContext = createContext<MetaModel | undefined>(undefined)
