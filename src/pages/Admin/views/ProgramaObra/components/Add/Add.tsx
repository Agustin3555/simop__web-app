import { Input } from '@/components'
import { LocalAdd2 } from '@/pages/Admin/components'
import { ProgramaObraService } from '@/pages/Admin/services'

const Add = () => (
  <LocalAdd2
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
