import { View } from '../../components'
import { Query } from './components'

const DetalleObra = () => (
  <View
    viewKey="detalleObra"
    title="Detalle de Obra"
    localViews={[
      {
        localViewKey: 'query',
        title: 'Consultar',
        faIcon: 'fa-solid fa-search',
        component: <Query />,
      },
    ]}
  />
)

export default DetalleObra
