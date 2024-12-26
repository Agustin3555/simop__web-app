import { Input } from '@/components'
import { Combobox, LocalAdd2 } from '@/pages/Admin/components'
import {
  FojaMedicionService,
  CertificacionService,
} from '@/pages/Admin/services'

const Add = () => (
  <LocalAdd2
    createProvider={CertificacionService.create}
    fieldGroups={[
      {
        fields: [
          {
            accessorKey: 'fojaMedicionId',
            getValue: data => data.get.number,
            component: (
              <Combobox
                title="Foja De Medición"
                getForConnectProvider={FojaMedicionService.getForConnect}
              />
            ),
          },
          {
            accessorKey: 'numeroExpediente',
            getValue: data => data.get.string,
            component: <Input title="Número de Expediente" required />,
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
