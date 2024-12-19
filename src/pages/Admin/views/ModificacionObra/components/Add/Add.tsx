import { Input } from '@/components'
import { LocalAdd2 } from '@/pages/Admin/components'
import { ModificacionObraService } from '@/pages/Admin/services'

const Add = () => (
  <LocalAdd2
    createProvider={ModificacionObraService.create}
    fieldGroups={[
      {
        fields: [
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
