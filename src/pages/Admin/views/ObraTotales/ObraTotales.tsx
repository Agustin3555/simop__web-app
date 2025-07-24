import { ModuleView } from '../../components'
import { ObraMeta } from '../../modules/obra/obra.meta'

const ObraTotales = () => (
  <ModuleView
    view={{
      viewKey: 'obraTotales',
      title: 'Totales de Obra',
    }}
    metaModel={ObraMeta}
    query={{
      fetch: {
        key: 'totales',
        getAll: 'getAllTotales',
      },
      methods: {
        forGetAll: 'totales',
        forQuickFilters: 'totales-quickFilters',
      },
    }}
    add={false}
    edit={false}
  />
)

export default ObraTotales
