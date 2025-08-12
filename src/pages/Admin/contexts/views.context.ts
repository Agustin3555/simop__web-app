import { createContext } from 'react'

export interface ViewsContextProps {
  isActive: (viewKey?: string) => boolean
  select: (viewKey: string, i: 0 | 1) => void
}

export const ViewsContext = createContext<ViewsContextProps | undefined>(
  undefined,
)
