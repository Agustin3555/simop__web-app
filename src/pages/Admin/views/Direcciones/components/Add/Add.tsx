import { Input } from '@/components'
import { Combobox, LocalAdd2 } from '@/pages/Admin/components'
import { DireccionService, SubSecretariaService } from '@/pages/Admin/services'

const Add = () => (
  <LocalAdd2
    createProvider={DireccionService.create}
    fieldGroups={[
      {
        fields: [
          {
            accessorKey: 'subSecretariaId',
            getValue: data => data.get.number,
            component: (
              <Combobox
                title="Subsecretaría"
                getForConnectProvider={SubSecretariaService.getForConnect}
              />
            ),
          },
          {
            accessorKey: 'nombre',
            getValue: data => data.get.string,
            component: <Input title="Nombre" required />,
          },
        ],
      },
    ]}
  />
)

export default Add
