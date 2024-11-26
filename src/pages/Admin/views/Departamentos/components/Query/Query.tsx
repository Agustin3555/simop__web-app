import { LocalQuery } from '@/pages/Admin/components'
import { DepartamentoService, DireccionService } from '@/pages/Admin/services'

const Query = () => {
  return (
    <LocalQuery
      provider={DepartamentoService.getAll}
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
          accessorKey: 'direccion',
          ref: {
            provider: DireccionService.getOne,
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
