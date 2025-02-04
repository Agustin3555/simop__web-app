import { createContext } from 'react'

export type FieldResetFn = () => void

export const FieldResetFnsContext = createContext<FieldResetFn[]>([])
