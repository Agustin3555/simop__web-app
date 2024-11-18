import './Button.css'
import { Icon } from '..'
import { ButtonHTMLAttributes } from 'react'
import { classList } from '@/helpers'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  faIcon?: string
  hideText?: boolean
  _type?: 'secondary'
}

const Button = ({
  title,
  faIcon,
  hideText,
  _type,
  children,
  ...rest
}: Props) => (
  <button
    className={classList('cmp-button', 'button-look', _type)}
    title={title}
    {...rest}
  >
    {!hideText && title}
    {faIcon && <Icon faIcon={faIcon} />}
    {children}
  </button>
)

export default Button
