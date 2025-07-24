import { ModuleView } from '../../components'
import { ObraMeta } from '../../modules/obra/obra.meta'

const ObraGeneral = () => (
  <ModuleView
    view={{
      viewKey: 'obraGeneral',
      title: 'Obra Básica General',
    }}
    metaModel={ObraMeta}
    query={{
      methods: {
        forGetAll: 'general',
        forQuickFilters: 'general-quickFilters',
      },
    }}
    add={false}
    edit={false}
  />
)

export default ObraGeneral
