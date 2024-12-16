import { LocalQuery } from '@/pages/Admin/components'
import { DepartamentoService, DireccionService } from '@/pages/Admin/services'

const Query = () => (
  <LocalQuery
    getAllProvider={DepartamentoService.getAll}
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
          getOneProvider: DireccionService.getOne,
        },
      },
      {
        header: 'Creación del recurso',
        key: 'creado',
        type: 'dateTime',
      },
      {
        header: 'Modificación del recurso',
        key: 'modificado',
        type: 'dateTime',
      },
    ]}
  />
)

export default Query
