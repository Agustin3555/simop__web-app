import './ExternalLink.css'
import { Icon } from '..'
import { classList } from '@/helpers'

interface Props {
  title?: string
  faIcon?: string
  url: string
}

const ExternalLink = ({ title, faIcon, url }: Props) => (
  <a
    className={classList('cmp-external-link', 'button-look')}
    href={url}
    target="_blank"
    rel="noopener"
  >
    {title}
    {faIcon && <Icon faIcon={faIcon} />}
  </a>
)

export default ExternalLink
