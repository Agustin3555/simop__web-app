import { ReactNode, useEffect, useState } from 'react'
import { ViewActiveContext } from '../../contexts'
import { lastVisitedViewEntity } from '@/services/localStorage'

const ViewActiveProvider = ({
  initView,
  children,
}: {
  initView: string
  children: ReactNode
}) => {
  const [activeView, setActiveView] = useState(initView)

  useEffect(() => lastVisitedViewEntity.set(activeView), [activeView])

  return (
    <ViewActiveContext.Provider value={{ activeView, setActiveView }}>
      {children}
    </ViewActiveContext.Provider>
  )
}

export default ViewActiveProvider
