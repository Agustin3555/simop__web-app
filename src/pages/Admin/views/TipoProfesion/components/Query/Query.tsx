import { LocalQuery } from '@/pages/Admin/components'
import { TipoProfesionService } from '@/pages/Admin/services'

const Query = () => (
  <LocalQuery
    getAllProvider={TipoProfesionService.getAll}
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
