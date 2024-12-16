import { Input } from '@/components'
import { LocalAdd2 } from '@/pages/Admin/components'
import { TipoContratacionObraService } from '@/pages/Admin/services'

const Add = () => (
  <LocalAdd2
    createProvider={TipoContratacionObraService.create}
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
