import './View.css'
import { ReactNode } from 'react'
import { useViews } from '../../hooks/useViews.hook'
import { clsx } from '@/helpers'

export interface ViewProps {
  viewKey: string
  children: ReactNode
}

const View = ({ viewKey, children }: ViewProps) => {
  const { isActive } = useViews()

  return (
    <div className={clsx('cmp-view', viewKey, { active: isActive(viewKey) })}>
      {children}
    </div>
  )
}

export default View
