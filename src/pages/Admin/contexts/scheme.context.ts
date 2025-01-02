import { createContext } from 'react'
import { Scheme } from '../services/config'

interface SchemeContextProps {
  scheme: Scheme
}

export const SchemeContext = createContext<SchemeContextProps | undefined>(
  undefined,
)
