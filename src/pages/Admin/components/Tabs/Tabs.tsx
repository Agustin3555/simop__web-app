import './Tabs.css'
import { ReactNode, useState } from 'react'
import { useInputHandler } from '../../hooks/useInputHandler.hook'
import { LocalViewContext } from '@/pages/Admin/contexts/localViewLocation.context'
import { Icon } from '@/components'
import { clsx } from '@/helpers'

export interface TabPanel {
  tabPanelKey: string
  title: string
  iconClass: string
  component: ReactNode
}

export interface TabsProps {
  viewKey: string
  title: string
  tabPanels: TabPanel[]
}

const Tabs = ({ viewKey, title, tabPanels }: TabsProps) => {
  const [localView, setLocalView] = useState(() => {
    const localView =
      tabPanels.find(v => v.tabPanelKey === 'query') ?? tabPanels[0]

    return localView.tabPanelKey
  })

  const handleChange = useInputHandler(k => setLocalView(k))

  return (
    <div className="cmp-tabs">
      <header>
        <fieldset>
          {tabPanels.map(({ tabPanelKey, title, iconClass }) => (
            <label key={tabPanelKey} className="ui-l">
              {iconClass && <Icon {...{ iconClass }} />}
              <div className="text">{title}</div>
              <input
                type="radio"
                name={`tabbed-${viewKey}`}
                value={tabPanelKey}
                checked={tabPanelKey === localView}
                onChange={handleChange}
              />
            </label>
          ))}
        </fieldset>
        <h1>{title}</h1>
      </header>
      <div className="local-views">
        <LocalViewContext.Provider value={{ localView, setLocalView }}>
          {tabPanels.map(({ tabPanelKey, component }) => (
            <div
              key={tabPanelKey}
              className={clsx({ active: tabPanelKey === localView })}
            >
              {component}
            </div>
          ))}
        </LocalViewContext.Provider>
      </div>
    </div>
  )
}

export default Tabs
