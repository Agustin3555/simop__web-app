import { LocalQuery } from '@/pages/Admin/components'
import { LocalidadService, ProvinciaService } from '@/pages/Admin/services'

const Query = () => {
  return (
    <LocalQuery
      provider={LocalidadService.getAll}
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
          header: 'Dirección',
          accessorKey: 'provincia',
          ref: {
            provider: ProvinciaService.getOne,
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
