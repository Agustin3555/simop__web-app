import { Input } from '@/components'
import { Combobox, LocalAdd } from '@/pages/Admin/components'
import { DepartamentoService, DireccionService } from '@/pages/Admin/services'

const Add = () => (
  <LocalAdd
    createProvider={DepartamentoService.create}
    fieldGroups={[
      {
        fields: [
          {
            accessorKey: 'direccionId',
            getValue: data => data.get.number,
            component: (
              <Combobox
                title="Dirección"
                getForConnectProvider={DireccionService.getForConnect}
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
