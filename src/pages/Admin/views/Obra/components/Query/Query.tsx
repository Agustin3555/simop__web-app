import { LocalQuery } from '@/pages/Admin/components'
import {
  EmpresaService,
  LocalidadService,
  PaisService,
  ProvinciaService,
  ObraService,
  FinanciamientoService,
  EstadoObraService,
} from '@/pages/Admin/services'

const Query = () => {
  return (
    <LocalQuery
      getAllProvider={ObraService.getAll}
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
          header: 'Numero de Resolucion',
          key: 'numeroResolucion',
          type: 'number',
        },
        {
          header: 'Año de Resolucion',
          key: 'anioResolucion',
          type: 'number',
        },
        {
          header: 'Número Contratacion',
          key: 'numeroContratacion',
          type: 'number',
        },
        {
          header: 'Año Contratacion',
          key: 'anioContratacion',
          type: 'number',
        },
        {
          header: 'Monto Contratacion',
          key: 'montoContratacion',
          type: 'number',
        },
        {
          header: 'Número Expediente',
          key: 'numeroExpediente',
          type: 'number',
        },
        {
          header: 'Plazo Días',
          key: 'plazoDias',
          type: 'number',
        },
        {
          header: 'Fecha Inicio',
          key: 'fechaInicio',
          type: 'text',
        },
        {
          header: 'Fecha Inicio',
          key: 'fechaInicio',
          type: 'text',
        },
        {
          header: 'Fecha Fin',
          key: 'fechaFin',
          type: 'text',
        },
        {
          header: 'Observaciones',
          key: 'observaciones',
          type: 'text',
        },
        {
          header: 'Empresa',
          key: 'empresaId',
          ref: {
            getOneProvider: EmpresaService.getOne,
            field: 'Nombre',
          },
          type: 'number',
        },
        {
          header: 'País ',
          key: 'pais',
          ref: {
            getOneProvider: PaisService.getOne,
            field: 'Nombre',
          },
          type: 'number',
        },
        {
          header: 'Provincia ',
          key: 'provincia',
          ref: {
            getOneProvider: ProvinciaService.getOne,
            field: 'Nombre',
          },
          type: 'number',
        },
        {
          header: 'Localidad',
          key: 'localidad',
          ref: {
            getOneProvider: LocalidadService.getOne,
            field: 'Nombre',
          },
          type: 'number',
        },
        {
          header: 'Financiamiento',
          key: 'id',
          ref: {
            getOneProvider: FinanciamientoService.getOne,
            field: 'Nombre',
          },
          type: 'number',
        },
        {
          header: 'Estado de Obra',
          key: 'id',
          ref: {
            getOneProvider: EstadoObraService.getOne,
            field: 'Nombre',
          },
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
