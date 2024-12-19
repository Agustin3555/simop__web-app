import { Input } from '@/components'
import { Combobox, LocalAdd2 } from '@/pages/Admin/components'
import { InspectorService, TipoProfesionService } from '@/pages/Admin/services'

const Add = () => (
  <LocalAdd2
    createProvider={InspectorService.create}
    fieldGroups={[
      {
        fields: [
          {
            accessorKey: 'tiposProfesiones',
            getValue: data => data.get.number,
            component: (
              <Combobox
                multiple={true}
                title="Profesiones"
                getForConnectProvider={TipoProfesionService.getForConnect}
              />
            ),
          },
          {
            accessorKey: 'nombre',
            getValue: data => data.get.string,
            component: <Input title="Nombre" required />,
          },
          {
            accessorKey: 'apellido',
            getValue: data => data.get.string,
            component: <Input title="Apellido" required />,
          },
          {
            accessorKey: 'cuil',
            getValue: data => data.get.number,
            component: <Input title="CUIL" required />,
          },
        ],
      },
    ]}
  />
)

export default Add
