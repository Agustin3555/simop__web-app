import './Value.css'
import { Icon } from '@/components'
import { clsx } from '@/helpers'

interface ValueProps {
  text?: number | string
  iconClass?: string
  size?: 'l' | 'm' | 's'
  type?: 'primary' | 'secondary'
  pill?: boolean
}

const Value = ({
  text,
  iconClass,
  size = 'l',
  type = 'primary',
  pill = false,
}: ValueProps) => (
  <div
    className={clsx('cmp-value', `ui-${size}`, type, {
      square: iconClass !== undefined && text === undefined,
      pill,
    })}
  >
    {text}
    {iconClass && <Icon {...{ iconClass }} />}
  </div>
)

export default Value
