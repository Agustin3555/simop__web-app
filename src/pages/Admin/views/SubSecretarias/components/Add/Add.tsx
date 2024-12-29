import { Input } from '@/components'
import { LocalAdd } from '@/pages/Admin/components'
import { SubSecretariaService } from '@/pages/Admin/services'

const Add = () => (
  <LocalAdd
    createProvider={SubSecretariaService.create}
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
