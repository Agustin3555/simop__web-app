import './SecureHoldButton.css'
import { useRef } from 'react'
import { ActionState } from '@/hooks'
import { Icon, Loader } from '@/components'
import { classList } from '@/helpers'

interface Props {
  text?: string
  title: string
  faIcon?: string
  actionState: ActionState
  type?: 'secondary'
  action: () => Promise<void>
}

// TODO: que sea posible utilizarlo como botón en un formulario

const SecureHoldButton = ({
  text,
  title,
  faIcon,
  actionState,
  type,
  action,
}: Props) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseDown = () => {
    if (actionState === 'ready') timerRef.current = setTimeout(action, 3000)
  }

  const handleMouseUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  return (
    <button
      className={classList(
        'cmp-secure-hold-button',
        'button-look',
        'state',
        type
      )}
      title={`${title} (Mantener)`}
      disabled={actionState !== 'ready'}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <Loader
        handlingClass={classList({ active: actionState === 'loading' })}
      />
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
        {faIcon && <Icon faIcon={faIcon} />}
      </div>
    </button>
  )
}

export default SecureHoldButton
