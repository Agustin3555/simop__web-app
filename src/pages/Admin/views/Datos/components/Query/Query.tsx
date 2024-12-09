import { LocalQuery } from '@/pages/Admin/components'
import { DatosService,PaisService } from '@/pages/Admin/services'

const Query = () => {
  return (
    <LocalQuery
      provider={DatosService.getAll}
      columns={[
        {
          header: 'ID',
          key: 'id',
          type: 'number',
        },
        {
          header: 'CUIT',
          key: 'cuit',
          type: 'number',
        },
        {
          header: 'NombreEmpresa',
          key: 'nombreEmpresa',
          type: 'text',
        },
        {
          header: 'DireccionDeclarada',
          key: 'direccionDeclarada',
          type: 'text',
        },
        {
          header: 'Pais',

          ref: {
            provider: PaisService.getOne,
            field: 'Nombre',
          },
          type: 'number',
          key: 'id'
        },
        {
            header: 'Email',
            key: 'email',
            type: 'text',
          },
          {
            header: 'NumeroContacto',
            key: 'numeroContacto',
            type: 'number',
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
