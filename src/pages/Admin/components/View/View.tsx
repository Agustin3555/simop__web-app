import './View.css'
import { ReactNode } from 'react'
import { useViews } from '../../hooks'
import { classList } from '@/helpers'

export interface ViewProps {
  viewKey: string
  children: ReactNode
}

const View = ({ viewKey, children }: ViewProps) => {
  const { isActive } = useViews()

  return (
    <div
      className={classList('cmp-view', viewKey, { active: isActive(viewKey) })}
    >
      {children}
    </div>
  )
}

export default View
