import './Button.css'
import { ActionState } from '@/hooks'
import { Icon, Loader } from '..'
import { classList } from '@/helpers'
import { ButtonHTMLAttributes, forwardRef, MouseEventHandler } from 'react'

export interface ButtonProps {
  name?: string
  title?: string
  text?: string
  faIcon?: string
  type?: 'primary' | 'secondary' | 'tertiary'
  size?: 'l' | 'm' | 's'
  inverted?: boolean
  wrap?: boolean
  submit?: boolean
  actionState?: ActionState
  progress?: number
  onAction?: MouseEventHandler<HTMLButtonElement>
  buttonHTMLAttrs?: ButtonHTMLAttributes<HTMLButtonElement>
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      name,
      title,
      text,
      faIcon,
      size = 'l',
      type = 'primary',
      inverted = false,
      wrap = false,
      submit = false,
      actionState = 'ready',
      progress,
      onAction,
      buttonHTMLAttrs,
    },
    ref,
  ) => (
    <button
      className={classList('cmp-button', `ui-${size}`, type, {
        inverted,
        wrap,
        square: faIcon !== undefined && text === undefined,
      })}
      title={title ?? text}
      type={submit ? 'submit' : 'button'}
      disabled={actionState !== 'ready'}
      onClick={onAction}
      {...{ ref, name, ...buttonHTMLAttrs }}
    >
      <div
        className={classList('loading', { active: actionState === 'loading' })}
      >
        {progress && <p>{progress.toFixed(0)} %</p>}
        <Loader />
      </div>
      <Icon
        faIcon="fa-solid fa-xmark"
        handlingClass={classList({ active: actionState === 'error' })}
      />
      <Icon
        faIcon="fa-solid fa-check"
        handlingClass={classList({ active: actionState === 'success' })}
      />
      <div
        className={classList('body', 'text', {
          active: actionState === 'ready',
        })}
      >
        {text}
        {faIcon && <Icon {...{ faIcon }} />}
      </div>
    </button>
  ),
)

export default Button
