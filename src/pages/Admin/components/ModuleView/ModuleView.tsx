import './ModuleView.css'
import { useMemo } from 'react'
import { useConfigs } from '@/shared/contexts/Configs/useConfigs.hook'
import { useViews } from '../../hooks/useViews.hook'
import { PanelsDef, usePanels } from './hooks/usePanels.hook'
import { TableDefContext } from '../../contexts/tableDef.context'
import { TableProvider } from '@/shared/components/Table/contexts/Table/Table.context'
import { TableKey } from '../../constants/metaModelKey.const'
import { TABLE_DEFS } from '../../constants/metaModelDefinitions.const'
import { ConfigsProvider } from '@/shared/contexts/Configs/Configs.context'
import { Panel } from './components'
import { createColumnBehaviors } from '@/shared/core/column.helper'
import { clsx } from '@/helpers'
import { Dropdown } from '@/shared/components'
import Icon from '@/components/Icon/Icon'
import { Button } from '@/shared/components/Button/Button'
import { GraphScreenshotsProvider } from '../../providers/graphScreenshots.provider'

interface ModuleViewContentProps {
  viewKey: string
  extension?: PanelsDef
}

const ModuleViewBody = ({ viewKey, extension }: ModuleViewContentProps) => {
  const { isActive } = useViews()
  const selectedId = useConfigs(s => s.selectedId)
  const getSelectedConfig = useConfigs(s => s.getSelectedConfig)

  const {
    panelsDef,
    panels,
    availablePanels,
    addPanel,
    removePanel,
    replacePanel,
  } = usePanels(extension)

  const init = useMemo(
    () => getSelectedConfig().states,
    [getSelectedConfig, selectedId],
  )

  return (
    <div
      className={clsx('cmp-module-view', viewKey, {
        active: isActive(viewKey),
      })}
    >
      <TableProvider {...{ init }}>
        <GraphScreenshotsProvider>
          {panels.map(key => (
            <Panel
              key={key}
              panelKey={key}
              {...{ panelsDef, availablePanels, removePanel, replacePanel }}
            >
              {panelsDef[key].component}
            </Panel>
          ))}
          {availablePanels.length > 0 && (
            <Dropdown
              opener={attrs => (
                <button className="add" {...attrs}>
                  <Icon iconClass="fa-regular fa-window-maximize" />
                  <span>Nuevo panel</span>
                </button>
              )}
            >
              {availablePanels.map(key => (
                <Button
                  key={key}
                  iconClass={panelsDef[key].iconClass}
                  text={panelsDef[key].text}
                  bodyStretch
                  onAction={() => addPanel(key)}
                />
              ))}
            </Dropdown>
          )}
        </GraphScreenshotsProvider>
      </TableProvider>
    </div>
  )
}

interface ModuleViewProps {
  extension?: PanelsDef
  tableKey: TableKey
}

const ModuleView = ({ extension, tableKey }: ModuleViewProps) => {
  const tableDefCtx = useMemo(() => {
    const tableDef = TABLE_DEFS[tableKey]
    const columns = createColumnBehaviors(tableDef.columnDefs)
    return { tableDef, columns }
  }, [tableKey])

  return (
    <TableDefContext.Provider value={tableDefCtx}>
      <ConfigsProvider>
        <ModuleViewBody viewKey={tableDefCtx.tableDef.key} {...{ extension }} />
      </ConfigsProvider>
    </TableDefContext.Provider>
  )
}

export default ModuleView
