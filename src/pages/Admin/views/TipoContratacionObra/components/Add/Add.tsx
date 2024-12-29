import { Input } from '@/components'
import { LocalAdd } from '@/pages/Admin/components'
import { TipoContratacionObraService } from '@/pages/Admin/services'

const Add = () => (
  <LocalAdd
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
