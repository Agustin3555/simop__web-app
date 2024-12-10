import { LocalQuery } from '@/pages/Admin/components'
import { ProvinciaService, PaisService } from '@/pages/Admin/services'

const Query = () => (
  <LocalQuery
    provider={ProvinciaService.getAll}
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
        header: 'País',
        key: 'pais',
        type: 'text',
        ref: {
          field: 'Nombre',
          provider: PaisService.getOne,
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
