import './ExternalLink.css'
import { Icon } from '..'
import { classList } from '@/helpers'

interface Props {
  title?: string
  text?: string
  faIcon?: string
  url: string
  type?: 'primary' | 'secondary' | 'tertiary'
  size?: 'l' | 'm' | 's'
}

const ExternalLink = ({
  title,
  text,
  faIcon,
  url,
  type = 'primary',
  size = 'm',
}: Props) => (
  <a
    className={classList('cmp-external-link', `ui-${size}`, type, {
      square: faIcon !== undefined && text === undefined,
    })}
    title={title ?? text}
    href={url}
    target="_blank"
    rel="noopener"
  >
    {text}
    {faIcon && <Icon faIcon={faIcon} />}
  </a>
)

export default ExternalLink
