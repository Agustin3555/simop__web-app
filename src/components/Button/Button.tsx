import './Button.css'
import { ActionState } from '@/hooks'
import { Icon, Loader } from '..'
import { clsx } from '@/helpers'
import {
  ButtonHTMLAttributes,
  forwardRef,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'

export interface ButtonProps {
  name?: string
  title?: string
  text?: string
  iconClass?: string
  type?: 'primary' | 'secondary' | 'tertiary'
  size?: 'l' | 'm' | 's'
  inverted?: boolean
  wrap?: boolean
  submit?: boolean
  actionState?: ActionState
  progress?: number
  hold?: boolean
  badge?: boolean
  handlingClass?: string
  onAction?: MouseEventHandler<HTMLButtonElement>
  buttonHTMLAttrs?: ButtonHTMLAttributes<HTMLButtonElement>
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      name,
      title,
      text,
      iconClass,
      size = 'm',
      type = 'primary',
      inverted = false,
      wrap = false,
      submit = false,
      actionState,
      progress,
      hold = false,
      badge = false,
      handlingClass,
      onAction,
      buttonHTMLAttrs,
    },
    ref,
  ) => {
    const timerRef = useRef<number>(null)

    const clearTimer = useCallback(() => {
      if (!timerRef.current) return
      clearTimeout(timerRef.current)
      timerRef.current = null
    }, [])

    const handleMouseDown = useCallback<MouseEventHandler<HTMLButtonElement>>(
      e => {
        if (!onAction) return
        if (actionState === 'ready')
          timerRef.current = setTimeout(() => onAction(e), 3000)
      },
      [actionState, onAction],
    )

    const handlers = useMemo<ButtonHTMLAttributes<HTMLButtonElement>>(
      () =>
        hold
          ? {
              onMouseDown: handleMouseDown,
              onMouseUp: clearTimer,
              onMouseLeave: clearTimer,
            }
          : { onClick: onAction },
      [handleMouseDown, onAction],
    )

    useEffect(() => clearTimer, [clearTimer])

    return (
      <button
        className={clsx('cmp-button', `ui-${size}`, type, handlingClass, {
          inverted,
          wrap,
          square: iconClass !== undefined && text === undefined,
          hold,
          badge,
        })}
        // TODO: mejorar
        title={(title ?? text ?? '') + (hold ? ' (mantener)' : '')}
        type={submit ? 'submit' : 'button'}
        disabled={actionState ? actionState !== 'ready' : false}
        {...{ ref, name, ...handlers, ...buttonHTMLAttrs }}
      >
        {actionState && (
          <>
            <div
              className={clsx('loading', {
                active: actionState === 'loading',
              })}
            >
              {progress && <p>{progress.toFixed(0)} %</p>}
              <Loader />
            </div>
            <Icon
              iconClass="fa-solid fa-xmark"
              handlingClass={clsx({ active: actionState === 'error' })}
            />
            <Icon
              iconClass="fa-solid fa-check"
              handlingClass={clsx({ active: actionState === 'success' })}
            />
          </>
        )}
        <div
          className={clsx('body', 'text', {
            active: actionState ? actionState === 'ready' : true,
          })}
        >
          {text}
          {iconClass && <Icon {...{ iconClass }} />}
        </div>
      </button>
    )
  },
)

export default Button
