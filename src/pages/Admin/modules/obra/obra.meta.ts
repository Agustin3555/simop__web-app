import {
  defineProps,
  buildMetaModel,
  createBooleanProp,
  createDateProp,
  createTextProp,
  createRefListProp,
  createRefProp,
  createNumberProp,
} from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { select } from '../../helpers'
import { ObraService } from './obra.service'
import { ObraModel } from '.'
import { AmpliacionMeta } from '../ampliacion/ampliacion.meta'
import { EmpresaMeta } from '../empresa/empresa.meta'
import { FojaMedicionMeta } from '../fojaMedicion/fojaMedicion.meta'
import { InspectorMeta } from '../inspector/inspector.meta'
import { LocalidadMeta } from '../localidad/localidad.meta'
import { ModificacionMeta } from '../modificacion/modificacion.meta'
import { ParalizacionMeta } from '../paralizacion/paralizacion.meta'
import { RecepcionMeta } from '../recepcion/recepcion.meta'
import { RedeterminacionMeta } from '../redeterminacion/redeterminacion.meta'
import { RepresentanteMeta } from '../representante/representante.meta'
import { RescisionMeta } from '../rescision/rescision.meta'
import { TipoContratacionObraMeta } from '../tipoContratacionObra/tipoContratacionObra.meta'
import { TipoEstadoObraMeta } from '../tipoEstadoObra/tipoEstadoObra.meta'
import { TipoFinanciamientoObraMeta } from '../tipoFinanciamientoObra/tipoFinanciamientoObra.meta'
import { TipoProgramaObraMeta } from '../tipoProgramaObra/tipoProgramaObra.meta'
import { TipoTematicaObraMeta } from '../tipoTematicaObra/tipoTematicaObra.meta'
import { TipoOrigenFinanciamientoObraMeta } from '../tipoOrigenFinanciamientoObra/tipoOrigenFinanciamientoObra.meta'
import { TipoEnteObraMeta } from '../tipoEnteObra/tipoEnteObra.meta'
import { APGMeta } from '../apg/apg.meta'

const { props, allFields } = defineProps<ObraModel.Entity>({
  numero: createNumberProp({
    title: 'Número De Obra',
    config: {
      isBig: true,
    },
  }),
  nombre: createTextProp({
    title: 'Nombre',
    config: {
      field: {
        required: true,
      },
    },
  }),
  tipoEnteObra: createRefProp({
    metaModelKey: () => TipoEnteObraMeta,
    minSize: 6,
  }),
  solicitante: createTextProp({
    title: 'Solicitante',
  }),
  fechaPedido: createDateProp({
    title: 'Fecha de Pedido',
  }),
  empresa: createRefProp({
    metaModelKey: () => EmpresaMeta,
    minSize: 7,
  }),
  localidades: createRefListProp({
    metaModelKey: () => LocalidadMeta,
    minSize: 6,
  }),
  apgs: createRefListProp({
    metaModelKey: () => APGMeta,
    minSize: 6,
  }),
  tipoEstadoObra: createRefProp({
    metaModelKey: () => TipoEstadoObraMeta,
    minSize: 6,
  }),
  avanceTotal: createNumberProp({
    title: 'Avance Acumulado',
    config: {
      sub: '%',
      isDecimal: true,
    },
  }),
  inaugurada: createBooleanProp({
    title: 'Inaugurada',
  }),
  montoContratacion: createNumberProp({
    title: 'Monto de Contratación',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),
  fechaContratacion: createDateProp({
    title: 'Fecha de Contratación',
  }),
  tipoTematicaObra: createRefProp({
    metaModelKey: () => TipoTematicaObraMeta,
    minSize: 7,
  }),
  tipoProgramaObra: createRefProp({
    metaModelKey: () => TipoProgramaObraMeta,
  }),
  numeroExpediente: createTextProp({
    title: 'Número de Expediente de Contrato',
  }),
  numeroResolucion: createTextProp({
    title: 'Número de Resolución',
  }),
  anioResolucion: createNumberProp({
    title: 'Año de Resolución',
  }),
  numeroContratacion: createTextProp({
    title: 'Número de Contratación',
  }),
  tipoContratacionObra: createRefProp({
    metaModelKey: () => TipoContratacionObraMeta,
  }),
  tipoOrigenFinanciamientoObra: createRefProp({
    metaModelKey: () => TipoOrigenFinanciamientoObraMeta,
  }),
  tipoFinanciamientoObra: createRefProp({
    metaModelKey: () => TipoFinanciamientoObraMeta,
  }),
  fechaInicio: createDateProp({
    title: 'Fecha de Inicio',
  }),
  fechaFin: createDateProp({
    title: 'Fecha de Fin',
  }),
  plazoMeses: createNumberProp({
    title: 'Plazo en Meses',
  }),
  plazoDias: createNumberProp({
    title: 'Plazo en Días',
  }),
  nomenclaturaCatastral: createTextProp({
    title: 'Nomenclatura Catastral',
  }),
  direccion: createTextProp({
    title: 'Dirección',
  }),
  lugar: createTextProp({
    title: 'Lugar',
    config: {
      isLong: true,
    },
  }),
  observaciones: createTextProp({
    title: 'Observaciones generales',
    config: {
      isLong: true,
    },
  }),

  obraNueva: createBooleanProp({
    title: 'Obra nueva',
  }),
  porcentajeObraNueva: createNumberProp({
    title: 'Porcentaje de obra nueva',
    config: {
      isDecimal: true,
      sub: '%',
    },
  }),
  metrosCuadradosObraNueva: createNumberProp({
    title: 'm² (metros cuadrados) de obra nueva',
    config: {
      isDecimal: true,
      sub: 'm²',
    },
  }),
  metrosLinealesObraNueva: createNumberProp({
    title: 'm (metros lineales) de obra nueva',
    config: {
      isDecimal: true,
      sub: 'm',
    },
  }),
  observacionesObraNueva: createTextProp({
    title: 'Observaciones de obra nueva',
    config: {
      isLong: true,
    },
  }),
  obraRefaccionada: createBooleanProp({
    title: 'Obra refaccionada',
  }),
  porcentajeObraRefaccionada: createNumberProp({
    title: 'Porcentaje de obra refaccionada',
    config: {
      sub: '%',
      isDecimal: true,
    },
  }),
  metrosCuadradosObraRefaccionada: createNumberProp({
    title: 'm² (metros cuadrados) de obra refaccionada',
    config: {
      sub: 'm²',
      isDecimal: true,
    },
  }),
  metrosLinealesObraRefaccionada: createNumberProp({
    title: 'm (metros lineales) de obra refaccionada',
    config: {
      sub: 'm',
      isDecimal: true,
    },
  }),
  observacionesObraRefaccionada: createTextProp({
    title: 'Observaciones de obra refaccionada',
    config: {
      isLong: true,
    },
  }),

  balanceEconomico: createNumberProp({
    title: 'Balance Económico',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),
  nuevoMonto: createNumberProp({
    title: 'Nuevo Monto',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),
  totalCertificadoFojaMedicion: createNumberProp({
    title: 'Total Certificado de Fojas',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),
  totalOrdenPagoFojaMedicion: createNumberProp({
    title: 'Total Orden de Pago de Fojas',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),
  totalPagadoFojaMedicion: createNumberProp({
    title: 'Total Pagado de Fojas',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),
  totalPendientePagoFojaMedicion: createNumberProp({
    title: 'Total Pendiente de Pago de Fojas',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),
  totalCertificadoRedeterminacion: createNumberProp({
    title: 'Total Certificado de Redeterm.',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),
  totalOrdenPagoRedeterminacion: createNumberProp({
    title: 'Total Orden de Pago de Redeterm.',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),
  totalPagadoRedeterminacion: createNumberProp({
    title: 'Total Pagado de Redeterm.',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),
  totalPendientePagoRedeterminacion: createNumberProp({
    title: 'Total Pendiente de Pago de Redeterm.',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),
  porcentajePendienteCertificar: createNumberProp({
    title: 'Porcentaje Pendiente a Certificar',
    config: {
      sub: '%',
      isDecimal: true,
    },
  }),
  montoPendienteCertificar: createNumberProp({
    title: 'Monto Pendiente a Certificar',
    minSize: MinSize.m,
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),

  totalPendientePago: createNumberProp({
    title: 'Total Pendiente de Pago de Redeterm.',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),

  representantes: createRefListProp({
    metaModelKey: () => RepresentanteMeta,
  }),
  inspectores: createRefListProp({
    metaModelKey: () => InspectorMeta,
  }),
  fojasMedicion: createRefListProp({
    metaModelKey: () => FojaMedicionMeta,
  }),
  redeterminaciones: createRefListProp({
    metaModelKey: () => RedeterminacionMeta,
  }),
  ampliaciones: createRefListProp({
    metaModelKey: () => AmpliacionMeta,
  }),
  modificaciones: createRefListProp({
    metaModelKey: () => ModificacionMeta,
  }),
  paralizaciones: createRefListProp({
    metaModelKey: () => ParalizacionMeta,
  }),
  rescisiones: createRefListProp({
    metaModelKey: () => RescisionMeta,
  }),
  recepciones: createRefListProp({
    metaModelKey: () => RecepcionMeta,
  }),

  ...COMMON_PROPS,
})

const BASICO: (keyof ObraModel.Entity)[] = select(allFields, 'only', [
  'numero',
  'nombre',
  'tipoEnteObra',
  'solicitante',
  'fechaPedido',
  'empresa',
  'numeroExpediente',
  'numeroResolucion',
  'anioResolucion',
  'numeroContratacion',
  'fechaContratacion',
  'montoContratacion',
  'tipoContratacionObra',
  'tipoOrigenFinanciamientoObra',
  'tipoFinanciamientoObra',
  'tipoProgramaObra',
  'tipoTematicaObra',
  'tipoEstadoObra',
  'fechaInicio',
  'fechaFin',
  'plazoMeses',
  'plazoDias',
  'nomenclaturaCatastral',
  'localidades',
  'direccion',
  'lugar',
  'avanceTotal',
  'inaugurada',
  'porcentajePendienteCertificar',
  'totalPendientePago',
  'observaciones',
])

const TOTALES: (keyof ObraModel.Entity)[] = select(allFields, 'only', [
  'balanceEconomico',
  'nuevoMonto',

  'totalCertificadoFojaMedicion',
  'totalPagadoFojaMedicion',
  'totalOrdenPagoFojaMedicion',
  'totalPendientePagoFojaMedicion',

  'totalCertificadoRedeterminacion',
  'totalPagadoRedeterminacion',
  'totalOrdenPagoRedeterminacion',
  'totalPendientePagoRedeterminacion',

  'porcentajePendienteCertificar',
  'montoPendienteCertificar',
])

const DERIVADOS: (keyof ObraModel.Entity)[] = select(allFields, 'only', [
  'representantes',
  'inspectores',
  'fojasMedicion',
  'redeterminaciones',
  'ampliaciones',
  'modificaciones',
  'paralizaciones',
  'rescisiones',
  'recepciones',
])

const QUICK_FILTERS: (keyof ObraModel.Entity)[] = select(allFields, 'only', [
  'empresa',
  'fechaInicio',
  'localidades',
  'tipoEstadoObra',
  'tipoProgramaObra',
  'tipoTematicaObra',
])

const fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: select(allFields, 'except', [
      ...TOTALES,
      ...DERIVADOS,
    ] as (keyof ObraModel.Entity)[]),
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [
      {
        fields: BASICO,
      },
      {
        key: 'modalidad',
        title: 'Modalidad',
        fields: select(allFields, 'only', [
          'obraNueva',
          'porcentajeObraNueva',
          'metrosCuadradosObraNueva',
          'metrosLinealesObraNueva',
          'observacionesObraNueva',
          'obraRefaccionada',
          'porcentajeObraRefaccionada',
          'metrosCuadradosObraRefaccionada',
          'metrosLinealesObraRefaccionada',
          'observacionesObraRefaccionada',
        ]),
      },
    ],
  },
  {
    methods: ['general'],
    fields: select(allFields, 'only', [
      'numero',
      'nombre',
      'empresa',
      'numeroExpediente',
      'fechaContratacion',
      'montoContratacion',
      'tipoFinanciamientoObra',
      'tipoProgramaObra',
      'tipoTematicaObra',
      'tipoEstadoObra',
      'fechaInicio',
      'localidades',
      'avanceTotal',
    ]),
  },
  {
    methods: ['general-quickFilters'],
    fields: QUICK_FILTERS,
  },
  {
    methods: ['totales'],
    fields: [
      ...select(allFields, 'only', [
        'empresa',
        'nombre',
        'localidades',
        'tipoEstadoObra',
        'avanceTotal',
        'montoContratacion',
        'fechaContratacion',
        'tipoTematicaObra',
        'tipoProgramaObra',
      ]),
      // ...TOTALES,
    ] as (keyof ObraModel.Entity)[],
  },
  {
    methods: ['totales-quickFilters'],
    fields: QUICK_FILTERS,
  },
  {
    methods: ['detalle'],
    groups: [
      {
        title: '',
        fields: select(allFields, 'only', [
          'numero',
          'nombre',
          'empresa',
          'localidades',
          'tipoTematicaObra',
          'tipoProgramaObra',
          'avanceTotal',
          'montoContratacion',
          'fechaContratacion',
          'fechaInicio',
          'plazoMeses',
          'numeroExpediente',
          'numeroResolucion',
          'anioResolucion',
          'numeroContratacion',
          'tipoContratacionObra',
          'tipoFinanciamientoObra',
          'tipoEstadoObra',
          'fechaFin',
          'plazoDias',
          'nomenclaturaCatastral',
          'direccion',
          'lugar',
          'observaciones',
        ]),
      },
      {
        key: 'totales',
        title: 'Totales',
        fields: TOTALES,
      },
      {
        key: 'derivados',
        title: 'Derivados',
        fields: DERIVADOS,
      },
    ],
  },
  {
    methods: ['planificacion-geografica'],
    fields: select(allFields, 'only', [
      'nombre',
      'empresa',
      'localidades',
      'apgs',
      'tipoTematicaObra',
      'avanceTotal',
      'montoContratacion',
      'fechaContratacion',
      'tipoEstadoObra',
      'tipoEnteObra',
      'inaugurada',
    ]),
  },
]

export const ObraMeta = buildMetaModel(
  {
    key: 'obra',
    title: {
      singular: 'Obra',
      plural: 'Obras',
    },
    faIcon: 'fa-solid fa-tree-city',

    service: ObraService,
    refreshRate: 'medium',
    anchorField: 'nombre',
    props,
  },
  fieldsByService,
)
