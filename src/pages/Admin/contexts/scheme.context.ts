import { createContext } from 'react'
import { Scheme } from '@/models/config'

interface SchemeContextProps {
  scheme: Scheme
}

export const SchemeContext = createContext<SchemeContextProps | undefined>(
  undefined,
)
