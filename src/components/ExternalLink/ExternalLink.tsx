import './ExternalLink.css'
import { Icon } from '..'
import { clsx } from '@/helpers'

interface Props {
  title?: string
  text?: string
  iconClass?: string
  url: string
  type?: 'primary' | 'secondary' | 'tertiary'
  size?: 'l' | 'm' | 's'
}

const ExternalLink = ({
  title,
  text,
  iconClass,
  url,
  type = 'primary',
  size = 'm',
}: Props) => (
  <a
    className={clsx('cmp-external-link', `ui-${size}`, type, {
      square: iconClass !== undefined && text === undefined,
    })}
    title={title ?? text}
    href={url}
    target="_blank"
    rel="noopener"
  >
    {text}
    {iconClass && <Icon iconClass={iconClass} />}
  </a>
)

export default ExternalLink
