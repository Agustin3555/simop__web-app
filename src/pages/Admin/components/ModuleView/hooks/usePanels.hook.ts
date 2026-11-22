import { ReactNode, useMemo, useState } from 'react'
import { DEFAULT_PANELS } from '../defaultPanels.const'

export type PanelsDef = Record<
  string,
  {
    text: string
    iconClass: string
    component: ReactNode
  }
>

export const usePanels = (extension?: PanelsDef) => {
  const panelsDef = useMemo(
    () => ({ ...DEFAULT_PANELS, ...extension }),
    [extension],
  )

  const [panels, setPanels] = useState<string[]>(['query'])

  const availablePanels = useMemo(() => {
    return Object.keys(panelsDef).filter(k => !panels.includes(k))
  }, [panelsDef, panels])

  const addPanel = (panelKey: string) => {
    if (!panels.includes(panelKey)) setPanels([...panels, panelKey])
  }

  const removePanel = (panelKey: string) => {
    setPanels(panels.filter(k => k !== panelKey))
  }

  const replacePanel = (oldPanelKey: string, newPanelKey: string) => {
    setPanels(panels.map(k => (k === oldPanelKey ? newPanelKey : k)))
  }

  return {
    panelsDef,
    panels,
    availablePanels,
    addPanel,
    removePanel,
    replacePanel,
  }
}
