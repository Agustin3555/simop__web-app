import './ViewSwitcher.css'
import { ReactNode, useState } from 'react'
import { SegmentedControl } from '../SegmentedControl/SegmentedControl'
import { clsx } from '@/helpers'

interface View {
  key: string
  text?: string
  iconClass?: string
  component: ReactNode
}

export interface ViewSwitcherProps {
  name: string
  defaultView?: string
  views: View[]
  controlExpanded?: boolean
}

export const ViewSwitcher = ({
  name,
  defaultView,
  views,
  controlExpanded = false,
}: ViewSwitcherProps) => {
  const [viewActive, setViewActive] = useState(defaultView ?? views[0].key)

  return (
    <div className={clsx('cmp-view-switcher', { controlExpanded })}>
      <SegmentedControl
        options={views.map(({ key, text, iconClass }) => ({
          text,
          iconClass,
          inputHtmlAttrs: {
            checked: key === viewActive,
            onChange: () => setViewActive(key),
          },
        }))}
        {...{ name }}
      />
      <div className="views">
        {views.map(({ key, component }) => (
          <div
            key={key}
            className={clsx('view-container', { isActive: viewActive === key })}
          >
            {component}
          </div>
        ))}
      </div>
    </div>
  )
}
