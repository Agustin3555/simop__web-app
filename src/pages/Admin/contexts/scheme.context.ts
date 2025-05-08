import { createContext } from 'react'
import { MetaModel } from '../services/config'

interface SchemeContextProps {
  scheme: MetaModel
}

export const SchemeContext = createContext<SchemeContextProps | undefined>(
  undefined,
)
