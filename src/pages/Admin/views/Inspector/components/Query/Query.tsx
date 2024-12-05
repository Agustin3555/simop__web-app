import { LocalQuery } from '@/pages/Admin/components'
import { InspectorService } from '@/pages/Admin/services'

const Query = () => {
  return (
    <LocalQuery
      provider={InspectorService.getAll}
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
