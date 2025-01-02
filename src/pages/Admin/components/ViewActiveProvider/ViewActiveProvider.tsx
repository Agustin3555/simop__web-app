import { ReactNode, useEffect, useState } from 'react'
import { ViewActiveContext } from '../../contexts'
import { lastVisitedViewEntity } from '@/services/localStorage'

interface Props {
  initView: string
  children: ReactNode
}

const ViewActiveProvider = ({ initView, children }: Props) => {
  const [activeView, setActiveView] = useState(initView)

  useEffect(() => lastVisitedViewEntity.set(activeView), [activeView])

  return (
    <ViewActiveContext.Provider value={{ activeView, setActiveView }}>
      {children}
    </ViewActiveContext.Provider>
  )
}

export default ViewActiveProvider
