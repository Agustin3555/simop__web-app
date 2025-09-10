import { useMetaModels } from '../../hooks'
import { LocalAdd, LocalConfig, LocalEdit, LocalQuery, View } from '..'
import { ViewProps } from '../View/View'
import { MetaModelKey } from '../../constants/metaModelKey.const'
import { MetaModelContext } from '../../contexts/metaModel.context'
import { MetaModel } from '../../meta/metaModel'
import { TableProvider } from '../../providers'
import { LocalQueryProps } from '../LocalQuery/LocalQuery'

interface ModuleViewProps {
  view?: Partial<ViewProps>
  metaModelKey: MetaModelKey
  queryPanels?: LocalQueryProps['panels']
}

const ModuleView = ({ view, metaModelKey, queryPanels }: ModuleViewProps) => {
  const { viewKey, title, localViews } = view ?? {}

  const { getMetaModelEntry } = useMetaModels()
  const { ready, metaModel } = getMetaModelEntry(metaModelKey)

  if (!(ready && metaModel)) return null

  const views = [
    {
      title: 'Configurar',
      faIcon: 'fa-solid fa-sliders',
      localViewKey: 'config',
      component: <LocalConfig />,
    },
    {
      title: 'Consultar',
      faIcon: 'fa-solid fa-search',
      localViewKey: 'query',
      component: <LocalQuery panels={queryPanels} />,
    },
    {
      title: 'Agregar',
      faIcon: 'fa-solid fa-plus',
      localViewKey: 'add',
      component: <LocalAdd />,
    },
    {
      title: 'Editar',
      faIcon: 'fa-solid fa-pen',
      localViewKey: 'edit',
      component: <LocalEdit />,
    },
    ...(localViews ?? []),
  ]

  return (
    <MetaModelContext.Provider value={metaModel as MetaModel}>
      <TableProvider>
        <View
          viewKey={viewKey ?? metaModel.key}
          title={title ?? metaModel.title.plural}
          localViews={views}
        />
      </TableProvider>
    </MetaModelContext.Provider>
  )
}

export default ModuleView
