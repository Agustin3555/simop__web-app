import './StateButton.css'
import { Icon, Loader } from '..'
import { ActionState } from '@/hooks'
import { classList } from '@/helpers'
import { ButtonHTMLAttributes, MouseEventHandler } from 'react'

export interface StateButtonProps
  extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  text: number | string
  hiddenText?: boolean
  title?: number | string
  faIcon?: string
  actionState: ActionState
  _type?: 'secondary'
  handlingClass?: string
  handleAction?: MouseEventHandler<HTMLButtonElement>
}

const StateButton = ({
  text,
  hiddenText = false,
  title,
  faIcon = 'fa-solid fa-arrow-right',
  actionState,
  type,
  _type,
  handlingClass,
  handleAction,
}: StateButtonProps) => (
  <button
    type={type ?? 'button'}
    className={classList(
      'cmp-state-button',
      'button-look',
      'state',
      _type,
      handlingClass,
    )}
    title={String(title || text)}
    disabled={actionState !== 'ready'}
    onClick={handleAction}
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
      {!hiddenText && text}
      <Icon faIcon={faIcon} />
    </div>
  </button>
)

export default StateButton
