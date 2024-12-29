import { createContext } from 'react'

interface ViewActiveContextProps {
  activeView: string
  setActiveView: (viewKey: string) => void
}

export const ViewActiveContext = createContext<
  ViewActiveContextProps | undefined
>(undefined)
