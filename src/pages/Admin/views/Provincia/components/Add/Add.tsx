import { Input } from '@/components'
import { Combobox, LocalAdd } from '@/pages/Admin/components'
import { ProvinciaService, PaisService } from '@/pages/Admin/services'

const Add = () => (
  <LocalAdd
    createProvider={ProvinciaService.create}
    fieldGroups={[
      {
        fields: [
          {
            accessorKey: 'paisId',
            getValue: data => data.get.number,
            component: (
              <Combobox
                title="País"
                getForConnectProvider={PaisService.getForConnect}
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
