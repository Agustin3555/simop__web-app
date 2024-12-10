import { LocalQuery } from '@/pages/Admin/components'
import {
  RepresentanteEmpresaService,
  TipoRepresentanteEmpresaService,
  PaisService,
  ProvinciaService,
  LocalidadService,
} from '@/pages/Admin/services'

const Query = () => {
  return (
    <LocalQuery
      provider={RepresentanteEmpresaService.getAll}
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
          header: 'Fecha de creación',
          key: 'creado',
          type: 'dateTime',
        },
        {
          header: 'Fecha de modificación',
          key: 'modificado',
          type: 'dateTime',
        },
        {
          header: 'Apellidos',
          key: 'apellidos',
          type: 'text',
        },
        {
          header: 'Dirección declarada',
          key: 'direccionDeclarada',
          type: 'text',
        },
        {
          header: 'CUIT Representante',
          key: 'cuitRepresentante',
          type: 'number',
        },
        {
          header: 'CUIT Empresa',
          key: 'cuitEmpresa',
          type: 'number',
        },
        {
          header: 'Numero de Matricula',
          key: 'numeroMatricula',
          type: 'number',
        },
        {
          header: 'País ',
          key: 'pais',
          ref: {
            provider: PaisService.getOne,
            field: 'Nombre',
          },
          type: 'number',
        },
        {
          header: 'Provincia ',
          key: 'provincia',
          ref: {
            provider: ProvinciaService.getOne,
            field: 'Nombre',
          },
          type: 'number',
        },
        {
          header: 'Localidad',
          key: 'localidad',
          ref: {
            provider: LocalidadService.getOne,
            field: 'Nombre',
          },
          type: 'number',
        },
        {
          header: 'Numero de Matrícula',
          key: 'numeroMatricula',
          ref: {
            provider: TipoRepresentanteEmpresaService.getOne,
            field: 'Nombre',
          },
          type: 'number',
        },
      ]}
    />
  )
}

export default Query
