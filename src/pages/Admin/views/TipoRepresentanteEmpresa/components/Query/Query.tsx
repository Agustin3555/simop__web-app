import { LocalQuery } from '@/pages/Admin/components'
import { TipoRepresentanteEmpresaService } from '@/pages/Admin/services'

const Query = () => {
  return (
    <LocalQuery
      getAllProvider={TipoRepresentanteEmpresaService.getAll}
      columns={[
        {
          header: 'ID',
          key: 'id',
          type: 'number',
        },
        {
          header: 'Nombre',
          key: 'nombre',
          type: 'number',
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
