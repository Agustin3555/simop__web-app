import './StateButton.css'
import { Icon, Loader } from '..'
import { ActionState } from '@/hooks'
import { classList } from '@/helpers'
import { MouseEventHandler } from 'react'

interface Props {
  text?: string
  title: string
  faIcon?: string
  actionState: ActionState
  type?: 'secondary'
  handleAction?: MouseEventHandler<HTMLButtonElement>
}

const StateButton = ({
  text,
  title,
  faIcon = 'fa-solid fa-arrow-right',
  actionState,
  type,
  handleAction,
}: Props) => (
  <button
    className={classList('cmp-state-button', 'button-look', 'state', type)}
    title={title}
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
      {text}
      <Icon faIcon={faIcon} />
    </div>
  </button>
)

export default StateButton
