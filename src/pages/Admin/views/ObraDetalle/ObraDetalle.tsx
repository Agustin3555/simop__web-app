import { View } from '../../components'
import { Query } from './components'

const ObraDetalle = () => (
  <View
    viewKey="obraDetalle"
    title="Detalle de Obra Básica"
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

export default ObraDetalle
