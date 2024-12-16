import { LocalQuery } from '@/pages/Admin/components'
import { ParalizacionObraService } from '@/pages/Admin/services'

const Query = () => {
  return (
    <LocalQuery
      getAllProvider={ParalizacionObraService.getAll}
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
}

export default Query
