import { ModuleView } from '../../components'
import { Map } from './components'

const Obra = () => (
  <ModuleView
    metaModelKey={'obra'}
    queryPanels={[
      {
        key: 'map',
        title: 'Mapa',
        faIcon: 'fa-solid fa-map',
        component: <Map />,
      },
    ]}
  />
)

export default Obra
