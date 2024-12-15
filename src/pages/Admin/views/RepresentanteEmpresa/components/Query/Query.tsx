import { LocalQuery } from '@/pages/Admin/components'
import {
  RepresentanteEmpresaService,
  PaisService,
  ProvinciaService,
  LocalidadService,
} from '@/pages/Admin/services'

const Query = () => {
  return (
    <LocalQuery
      getAllProvider={RepresentanteEmpresaService.getAll}
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
          header: 'Dirección Declarada',
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
          header: 'Número de Matricula',
          key: 'numeroMatricula',
          type: 'text',
        },
        // {
        //   header: 'Vigencia',
        //   key: 'numeroMatricula',
        //   type: 'bool',
        //   boolConfig: {
        //     false: { text: 'No vigente', color: 'c' },
        //     true: { text: 'Vigente', color: 'b' },
        //   },
        // },
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
