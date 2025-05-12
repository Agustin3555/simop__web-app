import { SchemeView } from '../../components'
import { ObraModel } from '../../models'

const ObraGeneral = () => (
  <SchemeView
    view={{
      viewKey: 'obraGeneral',
      title: 'Obra Básica General',
    }}
    metaModel={ObraModel.metaModel}
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
