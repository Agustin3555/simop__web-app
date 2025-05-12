import { SchemeView } from '../../components'
import { ObraModel } from '../../models'

const ObraTotales = () => (
  <SchemeView
    view={{
      viewKey: 'obraTotales',
      title: 'Totales de Obra',
    }}
    metaModel={ObraModel.metaModel}
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
