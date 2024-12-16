import { LocalQuery } from '@/pages/Admin/components'
import { LocalidadService, ProvinciaService } from '@/pages/Admin/services'

const Query = () => {
  return (
    <LocalQuery
      getAllProvider={LocalidadService.getAll}
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
          header: 'Provincia',
          key: 'provincia',
          ref: {
            getOneProvider: ProvinciaService.getOne,
            field: 'Nombre',
          },
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
