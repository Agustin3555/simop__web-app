import { Input } from '@/components'
import { LocalAdd } from '@/pages/Admin/components'
import { ProgramaObraService } from '@/pages/Admin/services'

const Add = () => (
  <LocalAdd
    createProvider={ProgramaObraService.create}
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
