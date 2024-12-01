import { createContext, ReactNode, useContext, useState } from 'react'
import { ViewKey } from '../constants'

interface ViewActiveContextProps {
  activeView: ViewKey
  setActiveView: (viewKey: ViewKey) => void
}

const ViewActiveContext = createContext<ViewActiveContextProps | undefined>(
  undefined
)

export const ViewActiveProvider = ({
  initView,
  children,
}: {
  initView: ViewKey
  children: ReactNode
}) => {
  const [activeView, setActiveView] = useState(initView)

  return (
    <ViewActiveContext.Provider value={{ activeView, setActiveView }}>
      {children}
    </ViewActiveContext.Provider>
  )
}

export const useViewActive = (activeView: ViewKey) => {
  const context = useContext(ViewActiveContext)

  return context!.activeView === activeView
}

export const useViewNavigation = () => {
  const context = useContext(ViewActiveContext)

  return context!.setActiveView
}
