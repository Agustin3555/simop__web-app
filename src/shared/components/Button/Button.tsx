import './Button.css'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ButtonHTMLAttributes,
  type MouseEventHandler,
} from 'react'
import { Icon, Loader } from '@/components'
import { ActionState } from '@/hooks'
import { clsx } from '@/helpers'

export interface ButtonProps {
  handlingClass?: string
  text?: string
  title?: string
  iconClass?: string
  size?: 'xs' | 's' | 'm' | 'l'
  iconPosition?: 'start' | 'end'
  submit?: boolean
  holdToConfirm?: boolean
  border?: boolean
  wrap?: boolean
  bodyStretch?: boolean
  keepBody?: boolean
  actionState?: ActionState
  onAction?: MouseEventHandler<HTMLButtonElement>
  htmlAttrs?: ButtonHTMLAttributes<HTMLButtonElement>
}

export const Button = ({
  handlingClass,
  text,
  title,
  iconClass,
  size = 'm',
  iconPosition = 'end',
  submit = false,
  holdToConfirm = false,
  border = false,
  wrap = false,
  bodyStretch = false,
  keepBody = false,
  actionState,
  onAction,
  htmlAttrs,
}: ButtonProps) => {
  const timerRef = useRef<number>(null)

  const clearTimer = useCallback(() => {
    if (!timerRef.current) return
    clearTimeout(timerRef.current)
    timerRef.current = null
  }, [])

  useEffect(() => clearTimer, [clearTimer])

  const handlers: ButtonHTMLAttributes<HTMLButtonElement> = useMemo(
    () =>
      holdToConfirm
        ? {
            onMouseDown: e => {
              if (!onAction) return
              if (actionState === 'ready') {
                timerRef.current = setTimeout(() => onAction(e), 3000)
              }
            },
            onMouseUp: clearTimer,
            onMouseLeave: clearTimer,
          }
        : { onClick: onAction },
    [actionState, clearTimer, holdToConfirm, onAction],
  )

  const classes = clsx('new-cmp-button', `ui-${size}`, handlingClass, {
    iconStart: iconPosition === 'start',
    square: iconClass !== undefined && text === undefined,
    holdToConfirm,
    border,
    wrap,
    bodyStretch,
    keepBody,
  })

  return (
    <button
      className={classes}
      title={title ?? text}
      type={submit ? 'submit' : 'button'}
      disabled={actionState ? actionState !== 'ready' : false}
      {...handlers}
      {...htmlAttrs}
    >
      <div
        className={clsx('body', 'element', 'text', {
          onScreen: !keepBody && actionState ? actionState === 'ready' : true,
        })}
      >
        {text}
        {iconClass && <Icon {...{ iconClass }} />}
      </div>
      {actionState && (
        <div className="status-group">
          <div
            className={clsx('loader', 'element', {
              onScreen: actionState === 'loading',
            })}
          >
            <Loader {...{ size }} />
          </div>
          <Icon
            iconClass="ti ti-x"
            handlingClass={clsx('element', {
              onScreen: actionState === 'error',
            })}
          />
          <Icon
            iconClass="ti ti-check"
            handlingClass={clsx('element', {
              onScreen: actionState === 'success',
            })}
          />
        </div>
      )}
    </button>
  )
}
