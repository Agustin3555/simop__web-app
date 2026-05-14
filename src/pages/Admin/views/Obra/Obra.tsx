import { ModuleView } from '../../components'
import { Map, UpdateAmounts } from './components'

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
    view={{
      tabPanels: [
        {
          tabPanelKey: 'update-amounts',
          title: 'Actualizar montos',
          faIcon: 'fa-solid fa-money-bill-trend-up',
          component: <UpdateAmounts />,
        },
      ],
    }}
  />
)

export default Obra
