import './View.css'
import { ChangeEventHandler, ReactNode, useCallback, useState } from 'react'
import { useViewActive } from '../../contexts'
import { ViewKey } from '../../enums'
import { classList } from '@/helpers'
import { Icon, Separator } from '@/components'

interface Props {
  view: ViewKey
  items: {
    title: string
    faIcon?: string
  }[]
  children: ReactNode[]
}

const View = ({ view, items, children }: Props) => {
  const [localView, setLocalView] = useState(0)
  const active = useViewActive(view)

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    event => {
      const newIndex = Number(event.target.id)

      setLocalView(newIndex)
    },
    []
  )

  return (
    <div className={classList('cmp-view', view, { active })}>
      <fieldset>
        {items.map(({ title, faIcon }, index) => (
          <label key={title}>
            {faIcon && <Icon {...{ faIcon }} />}
            {title}
            <input
              type="radio"
              name={view}
              id={String(index)}
              checked={index === localView}
              onChange={handleChange}
            />
          </label>
        ))}
      </fieldset>
      <Separator />
      <div className="local-views">
        {children.map((child, index) => (
          <div
            key={index}
            className={classList({ active: index === localView })}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

export default View
