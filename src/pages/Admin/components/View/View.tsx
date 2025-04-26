import './View.css'
import { ReactNode, useState } from 'react'
import { useInputHandler, useViewActive } from '../../hooks'
import { LocalViewContext } from '../../contexts'
import { Icon, Separator } from '@/components'
import { classList } from '@/helpers'

export interface LocalView {
  localViewKey: string
  title: string
  faIcon: string
  component: ReactNode
}

export interface ViewProps {
  viewKey: string
  title: string
  localViews?: LocalView[]
}

const View = ({ viewKey, title, localViews = [] }: ViewProps) => {
  const isActive = useViewActive(viewKey)

  const [localView, setLocalView] = useState(localViews[0].localViewKey)

  const handleChange = useInputHandler(key => setLocalView(key))

  return (
    <div className={classList('cmp-view', viewKey, { active: isActive })}>
      <header>
        <fieldset>
          {localViews.map(({ localViewKey, title, faIcon }) => (
            <label key={localViewKey}>
              {faIcon && <Icon {...{ faIcon }} />}
              <div className="text">{title}</div>
              <input
                type="radio"
                name={`tabbed-${viewKey}`}
                value={localViewKey}
                checked={localViewKey === localView}
                onChange={handleChange}
              />
            </label>
          ))}
        </fieldset>
        <h1>{title}</h1>
      </header>
      <Separator />
      <div className="local-views">
        <LocalViewContext.Provider value={{ setLocalView }}>
          {localViews.map(({ localViewKey, component }) => (
            <div
              key={localViewKey}
              className={classList({ active: localViewKey === localView })}
            >
              {component}
            </div>
          ))}
        </LocalViewContext.Provider>
      </div>
    </div>
  )
}

export default View
