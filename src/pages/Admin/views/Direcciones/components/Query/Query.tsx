import { LocalQuery } from '@/pages/Admin/components'
import { DireccionService, SubSecretariaService } from '@/pages/Admin/services'

const Query = () => (
  <LocalQuery
    getAllProvider={DireccionService.getAll}
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
        header: 'Subsecretaría',
        key: 'subSecretaria',
        type: 'text',
        ref: {
          field: 'Nombre',
          getOneProvider: SubSecretariaService.getOne,
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
