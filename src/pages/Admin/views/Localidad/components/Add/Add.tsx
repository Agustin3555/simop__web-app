import { Input } from '@/components'
import { Combobox, LocalAdd2 } from '@/pages/Admin/components'
import { LocalidadService, ProvinciaService } from '@/pages/Admin/services'

const Add = () => (
  <LocalAdd2
    createProvider={LocalidadService.create}
    fieldGroups={[
      {
        fields: [
          {
            accessorKey: 'provinciaId',
            getValue: data => data.get.number,
            component: (
              <Combobox
                title="Provincia"
                getForConnectProvider={ProvinciaService.getForConnect}
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
