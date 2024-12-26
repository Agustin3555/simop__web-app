import { Input } from '@/components'
import { Combobox, LocalAdd2 } from '@/pages/Admin/components'
import {
  PagoCertificacionService,
  CertificacionService,
} from '@/pages/Admin/services'

const Add = () => (
  <LocalAdd2
    createProvider={PagoCertificacionService.create}
    fieldGroups={[
      {
        fields: [
          {
            accessorKey: 'certificacionId',
            getValue: data => data.get.number,
            component: (
              <Combobox
                title="Certificacion"
                getForConnectProvider={CertificacionService.getForConnect}
              />
            ),
          },
          {
            accessorKey: 'monto',
            getValue: data => data.get.number,
            component: <Input title="Monto" required />,
          },
          {
            accessorKey: 'numeroExpediente',
            getValue: data => data.get.string,
            component: <Input title="Número de Expediente" required />,
          },
          {
            accessorKey: 'numeroResolucion',
            getValue: data => data.get.string,
            component: <Input title="Número de Resolución" required />,
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
