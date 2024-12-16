import { LocalQuery } from '@/pages/Admin/components'
import {
  EmpresaService,
  LocalidadService,
  PaisService,
  ProvinciaService,
} from '@/pages/Admin/services'

const Query = () => {
  return (
    <LocalQuery
      getAllProvider={EmpresaService.getAll}
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
          key: 'nombre',
          type: 'text',
        },
        {
          header: 'DireccionDeclarada',
          key: 'direccion',
          type: 'text',
        },
        {
          header: 'País',
          key: 'pais',
          ref: {
            getOneProvider: PaisService.getOne,
            field: 'Nombre',
          },
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
          header: 'Localidad',
          key: 'localidad',
          ref: {
            getOneProvider: LocalidadService.getOne,
            field: 'Nombre',
          },
          type: 'text',
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
