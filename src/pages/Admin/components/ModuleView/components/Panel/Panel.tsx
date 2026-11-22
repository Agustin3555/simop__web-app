import './Panel.css'
import { ReactNode } from 'react'
import { usePanels } from '../../hooks/usePanels.hook'
import { Button } from '@/shared/components/Button/Button'
import { Dropdown } from '@/shared/components/Dropdown/Dropdown'

export interface PanelProps extends Pick<
  ReturnType<typeof usePanels>,
  'panelsDef' | 'availablePanels' | 'removePanel' | 'replacePanel'
> {
  panelKey: string
  children: ReactNode
}

export const Panel = ({
  panelKey,
  panelsDef,
  availablePanels,
  removePanel,
  replacePanel,
  children,
}: PanelProps) => {
  return (
    <article className="cmp-panel">
      <header>
        <Dropdown
          opener={attrs => (
            <Button
              text={panelsDef[panelKey].text}
              title="Cambiar panel"
              iconClass={panelsDef[panelKey].iconClass}
              size="s"
              htmlAttrs={{ ...attrs, disabled: availablePanels.length === 0 }}
            />
          )}
        >
          {availablePanels.map(key => (
            <Button
              key={key}
              iconClass={panelsDef[key].iconClass}
              text={panelsDef[key].text}
              bodyStretch
              onAction={() => replacePanel(panelKey, key)}
            />
          ))}
        </Dropdown>
        <Button
          size="s"
          iconClass="fa-solid fa-xmark"
          onAction={() => removePanel(panelKey)}
        />
      </header>
      {children}
    </article>
  )
}
