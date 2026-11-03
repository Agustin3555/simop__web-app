import './Checker.css'
import { Icon } from '@/components'
import { classList } from '@/helpers'

// TODO: existen componentes que no lo están usando

export const Checker = () => (
  <div className={classList('cmp-checker')}>
    <Icon faIcon="fa-solid fa-check" />
  </div>
)
