import { ModuleView } from '../../components'

const ObraTotales = () => (
  <ModuleView
    metaModelKey="obra"
    view={{
      viewKey: 'obraTotales',
      title: 'Totales de Obra',
    }}
    query={{
      fetch: {
        key: 'totales',
        getAll: 'getAllTotales',
      },
      methods: {
        forGetAll: 'totales',
      },
    }}
    add={false}
    edit={false}
  />
)

export default ObraTotales
