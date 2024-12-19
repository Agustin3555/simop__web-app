import { Input } from '@/components'
import { LocalAdd2 } from '@/pages/Admin/components'
import { FinanciamientoService } from '@/pages/Admin/services'

const Add = () => (
  <LocalAdd2
    createProvider={FinanciamientoService.create}
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
