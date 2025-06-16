import { View } from '../../components'
import { G } from './components'

const GM = () => (
  <View
    viewKey="gm"
    title="Detalle de Obra Básica"
    localViews={[
      {
        localViewKey: 'g',
        title: 'Consultar',
        faIcon: 'fa-solid fa-search',
        component: <G />,
      },
    ]}
  />
)

export default GM
