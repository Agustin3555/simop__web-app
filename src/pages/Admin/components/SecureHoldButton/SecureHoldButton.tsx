import './SecureHoldButton.css'
import { useCallback, useEffect, useRef } from 'react'
import { ActionState } from '@/hooks'
import { Icon, Loader } from '@/components'
import { classList } from '@/helpers'

interface Props {
  text?: string
  title: string
  faIcon?: string
  actionState: ActionState
  type?: 'secondary'
  handleAction: () => void | Promise<void>
}

// TODO: que sea posible utilizarlo como botón en un formulario

const SecureHoldButton = ({
  text,
  title,
  faIcon,
  actionState,
  type,
  handleAction,
}: Props) => {
  const timerRef = useRef<number | null>(null)

  const clearTimer = useCallback(() => {
    if (!timerRef.current) return

    clearTimeout(timerRef.current)
    timerRef.current = null
  }, [])

  const handleMouseDown = useCallback(() => {
    if (actionState === 'ready')
      timerRef.current = setTimeout(handleAction, 3000)
  }, [actionState, handleAction])

  useEffect(() => {
    return clearTimer
  }, [clearTimer])

  return (
    <button
      className={classList(
        'cmp-secure-hold-button',
        'button-look',
        'state',
        type,
      )}
      title={`${title} (mantener)`}
      disabled={actionState !== 'ready'}
      onMouseDown={handleMouseDown}
      onMouseUp={clearTimer}
      onMouseLeave={clearTimer}
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
