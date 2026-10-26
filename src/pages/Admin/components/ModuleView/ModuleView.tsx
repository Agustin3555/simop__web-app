import { useMemo } from 'react'
import { TableKey } from '../../constants/metaModelKey.const'
import { TableDefContext } from '../../contexts/tableDef.context'
import LocalQuery, { LocalQueryProps } from '../LocalQuery/LocalQuery'
import ViewTabs, { ViewTabsProps } from '../ViewTabs/ViewTabs'
import { TabPanel } from '../Tabs/Tabs'
import LocalAdd from '../LocalAdd/LocalAdd'
import LocalConfig from '../LocalConfig/LocalConfig'
import LocalEdit from '../LocalEdit/LocalEdit'
import { TABLE_DEFS } from '../../constants/metaModelDefinitions.const'
import { TableProvider } from '@/shared/components/Table/contexts/Table/Table.context'
import { ConfigsProvider } from '@/shared/contexts/Configs/Configs.context'
import { useConfigs } from '@/shared/contexts/Configs/useConfigs.hook'
import { createColumnBehaviors } from '@/shared/core/column.helper'

interface ModuleViewContentProps {
  viewKey: ViewTabsProps['viewKey']
  title: ViewTabsProps['title']
  tabPanels: ViewTabsProps['tabPanels']
}

const ModuleViewContent = ({
  viewKey,
  title,
  tabPanels,
}: ModuleViewContentProps) => {
  const selectedId = useConfigs(s => s.selectedId)
  const getSelectedConfig = useConfigs(s => s.getSelectedConfig)

  const init = useMemo(
    () => getSelectedConfig().states,
    [getSelectedConfig, selectedId],
  )

  return (
    <TableProvider {...{ init }}>
      <ViewTabs {...{ viewKey, title, tabPanels }} />
    </TableProvider>
  )
}

interface ModuleViewProps {
  view?: Partial<ViewTabsProps>
  tableKey: TableKey
  queryPanels?: LocalQueryProps['panels']
}

const ModuleView = ({ view, tableKey, queryPanels }: ModuleViewProps) => {
  const { viewKey, title, tabPanels } = view ?? {}

  const tableDefCtx = useMemo(() => {
    const tableDef = TABLE_DEFS[tableKey]
    const columns = createColumnBehaviors(tableDef.columnDefs)
    return { tableDef, columns }
  }, [tableKey])

  const { tableDef } = tableDefCtx

  const panels = useMemo<TabPanel[]>(
    () => [
      {
        title: 'Configurar',
        faIcon: 'fa-solid fa-sliders',
        tabPanelKey: 'config',
        component: <LocalConfig />,
      },
      {
        title: 'Consultar',
        faIcon: 'fa-solid fa-search',
        tabPanelKey: 'query',
        component: <LocalQuery panels={queryPanels} />,
      },
      {
        title: 'Agregar',
        faIcon: 'fa-solid fa-plus',
        tabPanelKey: 'add',
        component: <LocalAdd />,
      },
      // {
      //   title: 'Editar',
      //   faIcon: 'fa-solid fa-pen',
      //   tabPanelKey: 'edit',
      //   component: <LocalEdit />,
      // },
      ...(tabPanels ?? []),
    ],
    [],
  )

  return (
    <TableDefContext.Provider value={tableDefCtx}>
      <ConfigsProvider>
        <ModuleViewContent
          viewKey={viewKey ?? tableDef.key}
          title={title ?? tableDef.title.plural}
          tabPanels={panels}
        />
      </ConfigsProvider>
    </TableDefContext.Provider>
  )
}

export default ModuleView
