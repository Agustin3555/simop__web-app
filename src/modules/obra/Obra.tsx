import ModuleView from '@/pages/Admin/components/ModuleView/ModuleView'
import { Map, UpdateAmounts } from './components'

export const Obra = () => (
  <ModuleView
    tableKey="obra"
    extension={{
      'update-amounts': {
        text: 'Actualizar montos',
        iconClass: 'fa-solid fa-money-bill-trend-up',
        component: <UpdateAmounts />,
      },
      // 'map': {
      //   text: 'Mapa',
      //   iconClass: 'fa-solid fa-map',
      //   component: <Map />,
      // },
    }}
  />
)
