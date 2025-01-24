import './Button.css'
import { Icon } from '..'
import { ButtonHTMLAttributes } from 'react'
import { classList } from '@/helpers'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  title?: string
  faIcon?: string
  hideText?: boolean
  _type?: 'secondary'
}

const Button = ({
  text,
  title,
  faIcon,
  hideText,
  _type,
  children,
  ...rest
}: Props) => (
  <button
    className={classList('cmp-button', 'button-look', _type)}
    title={title || text}
    {...rest}
  >
    {!hideText && (text || title)}
    {faIcon && <Icon faIcon={faIcon} />}
    {children}
  </button>
)

export default Button
