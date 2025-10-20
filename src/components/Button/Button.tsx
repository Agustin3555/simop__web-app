import './Button.css'
import { ActionState } from '@/hooks'
import { Icon, Loader } from '..'
import { classList } from '@/helpers'
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
  faIcon?: string
  type?: 'primary' | 'secondary' | 'tertiary'
  size?: 'l' | 'm' | 's'
  inverted?: boolean
  wrap?: boolean
  submit?: boolean
  actionState?: ActionState
  progress?: number
  hold?: boolean
  badge?: boolean
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
      actionState,
      progress,
      hold = false,
      badge = false,
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
        className={classList('cmp-button', `ui-${size}`, type, {
          inverted,
          wrap,
          square: faIcon !== undefined && text === undefined,
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
              className={classList('loading', {
                active: actionState === 'loading',
              })}
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
          </>
        )}
        <div
          className={classList('body', 'text', {
            active: actionState ? actionState === 'ready' : true,
          })}
        >
          {text}
          {faIcon && <Icon {...{ faIcon }} />}
        </div>
      </button>
    )
  },
)

export default Button
