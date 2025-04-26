import './Button.css'
import { Icon } from '..'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { classList } from '@/helpers'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  title?: string
  faIcon?: string
  hideText?: boolean
  _type?: 'secondary'
  size?: 'xs' | 's'
  inverted?: boolean
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      text,
      title,
      faIcon,
      hideText,
      _type,
      size,
      inverted = false,
      children,
      ...rest
    },
    ref,
  ) => (
    <button
      ref={ref}
      className={classList('cmp-button', 'button-look', size, _type, {
        inverted,
      })}
      title={title || text}
      {...rest}
    >
      {!hideText && (text || title)}
      {faIcon && <Icon faIcon={faIcon} />}
      {children}
    </button>
  ),
)

export default Button
