import ModuleView from '@/pages/Admin/components/ModuleView/ModuleView'
import { UpdateAmounts } from './components'

export const Obra = () => (
  <ModuleView
    tableKey="obra"
    // queryPanels={[
    //   {
    //     key: 'map',
    //     title: 'Mapa',
    //     iconClass: 'fa-solid fa-map',
    //     component: <Map />,
    //   },
    // ]}
    view={{
      tabPanels: [
        {
          tabPanelKey: 'update-amounts',
          title: 'Actualizar montos',
          iconClass: 'fa-solid fa-money-bill-trend-up',
          component: <UpdateAmounts />,
        },
      ],
    }}
  />
)
