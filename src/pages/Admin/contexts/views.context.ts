import { createContext } from 'react'

export interface ViewsContextProps {
  isActive: (viewKey?: string) => boolean
  select: (viewKey: string) => void
}

export const ViewsContext = createContext<ViewsContextProps | undefined>(
  undefined,
)
