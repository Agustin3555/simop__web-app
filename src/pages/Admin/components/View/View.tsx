import './View.css'
import { ReactNode, useState } from 'react'
import { useInputHandler, useViews } from '../../hooks'
import { Icon } from '@/components'
import { classList } from '@/helpers'
import { LocalViewContext } from '../../contexts/localViewLocation.context'

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
  const { isActive } = useViews()
  const [localView, setLocalView] = useState(localViews[0].localViewKey)

  const handleChange = useInputHandler(key => setLocalView(key))

  return (
    <div
      className={classList('cmp-view', viewKey, { active: isActive(viewKey) })}
    >
      <header>
        <fieldset>
          {localViews.map(({ localViewKey, title, faIcon }) => (
            <label key={localViewKey} className="ui-l">
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
