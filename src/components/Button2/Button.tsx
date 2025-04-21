import './Button.css'
import { ActionState } from '@/hooks'
import { Icon, Loader } from '..'
import { classList } from '@/helpers'

interface ButtonProps {
  title?: string
  text?: string
  faIcon?: string
  type?: 'primary' | 'secondary' | 'tertiary'
  size?: 'l' | 'm' | 's'
  inverted?: boolean
  submit?: boolean
  actionState?: ActionState
  onAction?: () => void
}

const Button = ({
  title,
  text,
  faIcon,
  type = 'primary',
  size = 'l',
  inverted = false,
  submit = false,
  actionState = 'ready',
  onAction,
}: ButtonProps) => (
  <button
    className={classList('cmp-button', size, type, {
      inverted,
      square: faIcon !== undefined && text === undefined,
    })}
    title={title ?? text}
    type={submit ? 'submit' : 'button'}
    disabled={actionState !== 'ready'}
    onClick={onAction}
  >
    <Loader handlingClass={classList({ active: actionState === 'loading' })} />
    <Icon
      faIcon="fa-solid fa-xmark"
      handlingClass={classList({ active: actionState === 'error' })}
    />
    <Icon
      faIcon="fa-solid fa-check"
      handlingClass={classList({ active: actionState === 'success' })}
    />
    <div className={classList('body', { active: actionState === 'ready' })}>
      {text}
      {faIcon && <Icon {...{ faIcon }} />}
    </div>
  </button>
)

export default Button
