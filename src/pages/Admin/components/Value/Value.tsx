import './Value.css'
import { Icon } from '@/components'
import { classList } from '@/helpers'

interface ValueProps {
  text?: number | string
  faIcon?: string
  size?: 'l' | 'm' | 's'
  type?: 'primary' | 'secondary'
  pill?: boolean
}

const Value = ({
  text,
  faIcon,
  size = 'l',
  type = 'primary',
  pill = false,
}: ValueProps) => (
  <div
    className={classList('cmp-value', size, type, {
      square: faIcon !== undefined && text === undefined,
      pill,
    })}
  >
    {text}
    {faIcon && <Icon {...{ faIcon }} />}
  </div>
)

export default Value
