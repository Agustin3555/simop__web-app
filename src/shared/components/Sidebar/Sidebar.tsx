import './Sidebar.css'
import { ReactNode } from 'react'
import { clsx } from '@/helpers'

interface SidebarProps {
  handlingClass?: string
  isOpen: boolean
  close: () => void
  expandedLayout: ReactNode
  collapsedLayout: ReactNode
}

export const Sidebar = ({
  handlingClass,
  isOpen,
  close,
  expandedLayout,
  collapsedLayout,
}: SidebarProps) => {
  return (
    <div className={clsx('cmp-sidebar', handlingClass, { isOpen })}>
      <button title="Cerrar" onClick={close} />
      <div className="content">
        <div className={clsx('layout', 'expanded', { isActive: isOpen })}>
          {expandedLayout}
        </div>
        <div className={clsx('layout', 'collapsed', { isActive: !isOpen })}>
          {collapsedLayout}
        </div>
      </div>
    </div>
  )
}
