import { useMemo } from 'react'
import { useMetaModels } from '../../hooks'
import { MetaModelKey } from '../../constants/metaModelKey.const'
import { MetaModelContext } from '../../contexts/metaModel.context'
import { MetaModel } from '../../meta/metaModel'
import { TableProvider } from '../../providers'
import { LocalQueryProps } from '../LocalQuery/LocalQuery'
import { LocalAdd, LocalConfig, LocalEdit, LocalQuery } from '..'
import ViewTabs, { ViewTabsProps } from '../ViewTabs/ViewTabs'
import { TabPanel } from '../Tabs/Tabs'

interface ModuleViewProps {
  view?: Partial<ViewTabsProps>
  metaModelKey: MetaModelKey
  queryPanels?: LocalQueryProps['panels']
}

const ModuleView = ({ view, metaModelKey, queryPanels }: ModuleViewProps) => {
  const { viewKey, title, tabPanels } = view ?? {}

  const { getMetaModelEntry } = useMetaModels()
  const { ready, metaModel } = getMetaModelEntry(metaModelKey)

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
      {
        title: 'Editar',
        faIcon: 'fa-solid fa-pen',
        tabPanelKey: 'edit',
        component: <LocalEdit />,
      },
      ...(tabPanels ?? []),
    ],
    [],
  )

  if (!(ready && metaModel)) return null

  return (
    <MetaModelContext.Provider value={metaModel as MetaModel}>
      <TableProvider>
        <ViewTabs
          viewKey={viewKey ?? metaModel.key}
          title={title ?? metaModel.title.plural}
          tabPanels={panels}
        />
      </TableProvider>
    </MetaModelContext.Provider>
  )
}

export default ModuleView
