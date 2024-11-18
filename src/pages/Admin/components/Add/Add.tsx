import './View.css'
import { ReactNode } from 'react'
import { useViewActive } from '../../contexts'
import { ViewKey } from '../../enums'
import { classList } from '@/helpers'

interface Props {
  view: ViewKey
  children: ReactNode
}

const Add = ({ view, children }: Props) => {
  const active = useViewActive(view)

  return (
    <div className={classList('cmp-view', view, { active })}>{children}</div>
  )
}

export default Add
