import { PanelsDef } from './hooks/usePanels.hook'
import LocalAdd from '../LocalAdd/LocalAdd'
import LocalConfig from '../LocalConfig/LocalConfig'
import LocalQuery from '../LocalQuery/LocalQuery'

export const DEFAULT_PANELS: PanelsDef = {
  config: {
    text: 'Configurar',
    iconClass: 'fa-solid fa-sliders',
    component: <LocalConfig />,
  },
  query: {
    text: 'Consultar',
    iconClass: 'fa-solid fa-search',
    component: <LocalQuery />,
  },
  add: {
    text: 'Agregar',
    iconClass: 'fa-solid fa-plus',
    component: <LocalAdd />,
  },
}
