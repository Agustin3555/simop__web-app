import { LocalQuery } from '@/pages/Admin/components'
import { DireccionService, SubSecretariaService } from '@/pages/Admin/services'

const Query = () => {
  return (
    <LocalQuery
      provider={DireccionService.getAll}
      columns={[
        {
          header: 'ID',
          accessorKey: 'id',
        },
        {
          header: 'Nombre',
          accessorKey: 'nombre',
        },
        {
          header: 'Subsecretaría',
          accessorKey: 'subSecretaria',
          ref: {
            provider: SubSecretariaService.getOne,
            field: 'Nombre',
          },
        },
        {
          header: 'Fecha de creación',
          accessorKey: 'creado',
          format: 'dateTime',
        },
        {
          header: 'Fecha de modificación',
          accessorKey: 'modificado',
          format: 'dateTime',
        },
      ]}
    />
  )
}

export default Query
