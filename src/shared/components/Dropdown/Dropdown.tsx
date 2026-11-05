import './Dropdown.css'
import {
  useId,
  type ButtonHTMLAttributes,
  type ReactNode,
  type RefObject,
} from 'react'
import { clsx, varList } from '../../../helpers'

interface DropdownProps {
  handlingClass?: string
  ref?: RefObject<HTMLDivElement | null>
  gallery?: { c: number; r?: number }
  opener: (attrs: ButtonHTMLAttributes<HTMLButtonElement>) => ReactNode
  children:
    ReactNode | ((attrs: ButtonHTMLAttributes<HTMLButtonElement>) => ReactNode)
}

export const Dropdown = ({
  handlingClass,
  ref,
  gallery,
  opener,
  children,
}: DropdownProps) => {
  const id = useId()

  return (
    <div className={clsx('cmp-dropdown', handlingClass)}>
      {opener({ popoverTarget: id })}
      <div
        className={clsx('dropdown', 'raised-panel', {
          gallery: !!gallery,
        })}
        style={varList({ c: gallery?.c, r: gallery?.r })}
        popover="auto"
        {...{ ref, id }}
      >
        {typeof children === 'function'
          ? children({ popoverTarget: id, popoverTargetAction: 'close' })
          : children}
      </div>
    </div>
  )
}
