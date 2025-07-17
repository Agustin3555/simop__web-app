import { View } from '../../components'
import { This } from './components'

const PlanificacionGeografica = () => (
  <View
    viewKey="planificacionGeografica"
    title="Planificación Geográfica"
    localViews={[
      {
        localViewKey: 'g',
        title: 'Consultar',
        faIcon: 'fa-solid fa-search',
        component: <This />,
      },
    ]}
  />
)

export default PlanificacionGeografica
