import { LocalQuery } from '@/pages/Admin/components'
import { ProvinciaService, PaisService } from '@/pages/Admin/services'

const Query = () => {
  return (
    <LocalQuery
      provider={ProvinciaService.getAll}
      columns={[
        {
          header: 'ID',
          key: 'id',
          type: 'number'
        },
        {
          header: 'Nombre',
          key: 'nombre',
          type: 'number'
        },
        {
          header: 'Pais',
          key: 'pais',
          ref: {
            provider: PaisService.getOne,
            field: 'Nombre',
          },
          type: 'number'
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
}

export default Query
