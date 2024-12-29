import { ReactNode, useState } from 'react'
import { ViewActiveContext } from '../../contexts'

const ViewActiveProvider = ({
  initView,
  children,
}: {
  initView: string
  children: ReactNode
}) => {
  const [activeView, setActiveView] = useState(initView)

  return (
    <ViewActiveContext.Provider value={{ activeView, setActiveView }}>
      {children}
    </ViewActiveContext.Provider>
  )
}

export default ViewActiveProvider
