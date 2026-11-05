import './Icon.css'
import { clsx } from '@/helpers'

export interface Props {
  iconClass: string
  handlingClass?: string
}

const Icon = ({ iconClass, handlingClass }: Props) => (
  <i className={clsx('cmp-icon', iconClass, handlingClass)} />
)

export default Icon
