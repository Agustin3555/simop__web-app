import { useContext } from 'react'
import { ViewActiveContext } from '../contexts'

export const useViewActive = (activeView: string) => {
  const context = useContext(ViewActiveContext)

  return context!.activeView === activeView
}

export const useViewNavigation = () => {
  const context = useContext(ViewActiveContext)

  return context!.setActiveView
}
