import { Input } from '@/components'
import { Combobox, LocalAdd2 } from '@/pages/Admin/components'
import {
  FojaMedicionService,
  ObraService,
  InspectorService,
} from '@/pages/Admin/services'

const Add = () => (
  <LocalAdd2
    createProvider={FojaMedicionService.create}
    fieldGroups={[
      {
        fields: [
          {
            accessorKey: 'obraNumero',
            getValue: data => data.get.number,
            component: (
              <Combobox
                title="Número de Obra"
                getForConnectProvider={ObraService.getForConnect}
              />
            ),
          },
          {
            accessorKey: 'inspectorId',
            getValue: data => data.get.number,
            component: (
              <Combobox
                title="Inspector"
                getForConnectProvider={InspectorService.getForConnect}
              />
            ),
          },
          {
            accessorKey: 'numero',
            getValue: data => data.get.number,
            component: <Input title="Número" required />,
          },
          {
            accessorKey: 'numeroExpediente',
            getValue: data => data.get.string,
            component: <Input title="Número de Expediente" required />,
          },
          {
            accessorKey: 'avance',
            getValue: data => data.get.number,
            component: <Input title="Avance" required long="s" />,
          },
          {
            accessorKey: 'observaciones',
            getValue: data => data.get.string,
            component: <Input title="Observaciones" required long="l" />,
          },
          {
            accessorKey: 'fecha',
            getValue: data => data.get.string,
            component: <Input title="Fecha" type="date" required />,
          },
        ],
      },
    ]}
  />
)

export default Add
