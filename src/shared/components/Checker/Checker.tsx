import './Checker.css'
import { Icon } from '@/components'
import { clsx } from '@/helpers'

// TODO: existen componentes que no lo están usando

export const Checker = () => (
  <div className={clsx('cmp-checker')}>
    <Icon iconClass="fa-solid fa-check" />
  </div>
)
