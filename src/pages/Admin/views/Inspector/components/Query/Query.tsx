import { LocalQuery } from '@/pages/Admin/components'
import { InspectorService, TipoInspectorService } from '@/pages/Admin/services'

const Query = () => {
  return (
    <LocalQuery
      getAllProvider={InspectorService.getAll}
      columns={[
        {
          header: 'ID',
          key: 'id',
          type: 'number',
        },
        {
          header: 'CUIL',
          key: 'cuil',
          type: 'number',
        },
        {
          header: 'Apellido',
          key: 'apellido',
          type: 'text',
        },
        {
          header: 'Nombre',
          key: 'nombre',
          type: 'text',
        },
        {
          header: 'Profesiones',
          key: 'tiposProfesiones',
          type: 'text',
          ref: {
            field: 'Nombre',
            getOneProvider: TipoInspectorService.getOne,
          },
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
