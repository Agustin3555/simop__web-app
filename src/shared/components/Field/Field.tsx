import './Field.css'
import { ReactNode, useMemo } from 'react'
import { classList } from '@/helpers'

type RenderType = 'label' | 'fieldset' | 'div'

interface FieldProps {
  title: string
  render?: RenderType
  hideTitle?: boolean
  children: ReactNode
}

export const Field = ({
  title,
  render = 'label',
  hideTitle = false,
  children,
}: FieldProps) => {
  const content = useMemo(() => {
    const titleClassName = classList('title', 'text', {
      visuallyHidden: hideTitle,
    })

    const renderMatch: Record<RenderType, ReactNode> = {
      label: (
        <label>
          <span className={titleClassName}>{title}</span>
          {children}
        </label>
      ),
      fieldset: (
        <fieldset>
          <legend className={titleClassName}>{title}</legend>
          {children}
        </fieldset>
      ),
      div: (
        <div>
          <span className={titleClassName}>{title}</span>
          {children}
        </div>
      ),
    }

    return renderMatch[render]
  }, [children, hideTitle, render, title])

  return <div className="cmp-field">{content}</div>
}
