import { LocalQuery } from '@/pages/Admin/components'
import { DepartamentoService, DireccionService } from '@/pages/Admin/services'

const Query = () => (
  <LocalQuery
    provider={DepartamentoService.getAll}
    columns={[
      {
        header: 'ID',
        key: 'id',
        type: 'number',
      },
      {
        header: 'Nombre',
        key: 'nombre',
        type: 'text',
      },
      {
        header: 'Dirección',
        key: 'direccion',
        type: 'text',
        ref: {
          field: 'Nombre',
          provider: DireccionService.getOne,
        },
      },
      {
        header: 'Fecha de creación',
        key: 'creado',
        type: 'dateTime',
      },
      {
        header: 'Fecha de modificación',
        key: 'modificado',
        type: 'dateTime',
      },
    ]}
  />
)

export default Query
