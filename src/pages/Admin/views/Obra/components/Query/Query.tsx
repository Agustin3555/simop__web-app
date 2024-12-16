import { LocalQuery } from '@/pages/Admin/components'
import {
  EmpresaService,
  LocalidadService,
  ObraService,
  FinanciamientoService,
  EstadoObraService,
  TipoContratacionObraService,
  ProgramaObraService,
  TipoTematicaObraService,
} from '@/pages/Admin/services'

const Query = () => {
  return (
    <LocalQuery
      getAllProvider={ObraService.getAll}
      columns={[
        {
          header: 'Número de Obra',
          key: 'id',
          type: 'number',
        },
        {
          header: 'Nombre de Obra',
          key: 'nombre',
          type: 'text',
        },
        {
          header: 'Empresa',
          key: 'empresa',
          ref: {
            getOneProvider: EmpresaService.getOne,
            field: 'Nombre',
          },
          type: 'text',
        },
        {
          header: 'Número de Expediente',
          key: 'numeroExpediente',
          type: 'number',
        },
        {
          header: 'Número de Resolución',
          key: 'numeroResolucion',
          type: 'number',
        },
        {
          header: 'Año de Resolución',
          key: 'anioResolucion',
          type: 'number',
        },
        {
          header: 'Número de Contratación',
          key: 'numeroContratacion',
          type: 'number',
        },
        {
          header: 'Año de Contratación',
          key: 'anioContratacion',
          type: 'number',
        },
        {
          header: 'Monto de Contratación',
          key: 'montoContratacion',
          type: 'number',
        },
        {
          header: 'Tipo de Contratación',
          key: 'tipoContratacionObra',
          ref: {
            getOneProvider: TipoContratacionObraService.getOne,
            field: 'Nombre',
          },
          type: 'text',
        },
        {
          header: 'Financiamiento',
          key: 'tipoFinanciamientoObra',
          ref: {
            getOneProvider: FinanciamientoService.getOne,
            field: 'Nombre',
          },
          type: 'text',
        },
        {
          header: 'Programa',
          key: 'tipoProgramaObra',
          ref: {
            getOneProvider: ProgramaObraService.getOne,
            field: 'Nombre',
          },
          type: 'text',
        },
        {
          header: 'Temática',
          key: 'tipoTematicaObra',
          ref: {
            getOneProvider: TipoTematicaObraService.getOne,
            field: 'Nombre',
          },
          type: 'text',
        },
        {
          header: 'Estado',
          key: 'tipoEstadoObra',
          ref: {
            getOneProvider: EstadoObraService.getOne,
            field: 'Nombre',
          },
          type: 'text',
        },
        {
          header: 'Fecha de Inicio',
          key: 'fechaInicio',
          type: 'date',
        },
        {
          header: 'Fecha de Fin',
          key: 'fechaFin',
          type: 'date',
        },
        {
          header: 'Plazo en Meses',
          key: 'plazoMeses',
          type: 'number',
        },
        {
          header: 'Plazo en Días',
          key: 'plazoDias',
          type: 'number',
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
          header: 'Dirección',
          key: 'direccion',
          type: 'text',
        },
        {
          header: 'Lugar',
          key: 'lugar',
          type: 'text',
        },
        {
          header: 'Nomenclatura Catastral',
          key: 'nomenclaturaCatastral',
          type: 'text',
        },
        {
          header: 'Observaciones generales',
          key: 'observaciones',
          type: 'text',
        },
        {
          header: 'Obra nueva',
          key: 'obraNueva',
          type: 'boolean',
        },
        // {
        //   header: '% de obra nueva',
        //   key: 'porcentajeObraNueva',
        //   type: 'number',
        // },
        // {
        //   header: 'm² de obra nueva',
        //   key: 'metrosCuadradosObraNueva',
        //   type: 'number',
        // },
        // {
        //   header: 'm de obra nueva',
        //   key: 'metrosLinealesObraNueva',
        //   type: 'number',
        // },
        {
          header: 'Observaciones de obra nueva',
          key: 'observacionesObraNueva',
          type: 'text',
        },
        {
          header: 'Obra refaccionada',
          key: 'obraRefaccionada',
          type: 'boolean',
        },
        // {
        //   header: '% de obra refaccionada',
        //   key: 'porcentajeObraRefaccionada',
        //   type: 'number',
        // },
        // {
        //   header: 'm² de obra refaccionada',
        //   key: 'metrosCuadradosObraRefaccionada',
        //   type: 'number',
        // },
        // {
        //   header: 'm de obra refaccionada',
        //   key: 'metrosLinealesObraRefaccionada',
        //   type: 'number',
        // },
        {
          header: 'Observaciones de obra refaccionada',
          key: 'observacionesObraRefaccionada',
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
