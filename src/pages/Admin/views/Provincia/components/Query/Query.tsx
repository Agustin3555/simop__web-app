import { LocalQuery } from '@/pages/Admin/components'
import { ProvinciaService, PaisService } from '@/pages/Admin/services'

const Query = () => {
  return (
    <LocalQuery
      provider={ProvinciaService.getAll}
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
          header: 'Pais',
          accessorKey: 'pais',
          ref: {
            provider: PaisService.getOne,
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
