import { LocalQuery } from '@/pages/Admin/components'
import { SubSecretariaService } from '@/pages/Admin/services'

const Query = () => (
  <LocalQuery
    getAllProvider={SubSecretariaService.getAll}
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
