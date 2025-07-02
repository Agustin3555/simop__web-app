import {
  BooleanProp,
  DateProp,
  NumberProp,
  RefProp,
  MetaModel,
  TextLongProp,
  TextProp,
  RefListProp,
  MinSize,
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

export const ObraMeta = new MetaModel<ObraModel.Entity>({
  key: 'obra',
  service: ObraService,
  refreshRate: 'medium',
  title: {
    singular: 'Obra',
    plural: 'Obras',
  },
  faIcon: 'fa-solid fa-tree-city',

  anchorField: 'nombre',
  props: {
    numero: new NumberProp('Número De Obra', {
      big: true,
    }),
    nombre: new TextProp('Nombre', {
      field: {
        required: true,
      },
    }),
    tipoEnteObra: new RefProp({
      getMetaModel: () => TipoEnteObraMeta,
    }),
    solicitante: new TextProp('Solicitante'),
    fechaPedido: new DateProp('Fecha de Pedido'),
    empresa: new RefProp({
      getMetaModel: () => EmpresaMeta,
    }),
    localidad: new RefProp({
      getMetaModel: () => LocalidadMeta,
    }),
    tipoEstadoObra: new RefProp({
      getMetaModel: () => TipoEstadoObraMeta,
    }),
    avanceTotal: new NumberProp('Avance Acumulado', {
      decimal: true,
      sub: '%',
    }),
    inaugurada: new BooleanProp('Inaugurada'),
    montoContratacion: new NumberProp('Monto de Contratación', {
      decimal: true,
      isMoney: true,
      big: true,
      sum: true,
      pre: '$',
    }),
    fechaContratacion: new DateProp('Fecha de Contratación'),
    tipoTematicaObra: new RefProp({
      getMetaModel: () => TipoTematicaObraMeta,
    }),
    tipoProgramaObra: new RefProp({
      getMetaModel: () => TipoProgramaObraMeta,
    }),
    numeroExpediente: new TextProp('Número de Expediente de Contrato'),
    numeroResolucion: new TextProp('Número de Resolución'),
    anioResolucion: new NumberProp('Año de Resolución'),
    numeroContratacion: new TextProp('Número de Contratación'),
    tipoContratacionObra: new RefProp({
      getMetaModel: () => TipoContratacionObraMeta,
    }),
    tipoOrigenFinanciamientoObra: new RefProp({
      getMetaModel: () => TipoOrigenFinanciamientoObraMeta,
    }),
    tipoFinanciamientoObra: new RefProp({
      getMetaModel: () => TipoFinanciamientoObraMeta,
    }),
    fechaInicio: new DateProp('Fecha de Inicio'),
    fechaFin: new DateProp('Fecha de Fin'),
    plazoMeses: new NumberProp('Plazo en Meses'),
    plazoDias: new NumberProp('Plazo en Días'),
    nomenclaturaCatastral: new TextProp('Nomenclatura Catastral'),
    direccion: new TextProp('Dirección'),
    lugar: new TextLongProp('Lugar'),
    observaciones: new TextLongProp('Observaciones generales'),

    obraNueva: new BooleanProp('Obra nueva'),
    porcentajeObraNueva: new NumberProp('Porcentaje de obra nueva', {
      decimal: true,
      sub: '%',
    }),
    metrosCuadradosObraNueva: new NumberProp(
      'm² (metros cuadrados) de obra nueva',
      {
        decimal: true,
        sub: 'm²',
      },
    ),
    metrosLinealesObraNueva: new NumberProp(
      'm (metros lineales) de obra nueva',
      {
        decimal: true,
        sub: 'm',
      },
    ),
    observacionesObraNueva: new TextLongProp('Observaciones de obra nueva'),
    obraRefaccionada: new BooleanProp('Obra refaccionada'),
    porcentajeObraRefaccionada: new NumberProp(
      'Porcentaje de obra refaccionada',
      {
        decimal: true,
        sub: '%',
      },
    ),
    metrosCuadradosObraRefaccionada: new NumberProp(
      'm² (metros cuadrados) de obra refaccionada',
      {
        decimal: true,
        sub: 'm²',
      },
    ),
    metrosLinealesObraRefaccionada: new NumberProp(
      'm (metros lineales) de obra refaccionada',
      {
        decimal: true,
        sub: 'm',
      },
    ),
    observacionesObraRefaccionada: new TextLongProp(
      'Observaciones de obra refaccionada',
    ),

    balanceEconomico: new NumberProp('Balance Económico', {
      decimal: true,
      isMoney: true,
      big: true,
      sum: true,
      pre: '$',
    }),
    nuevoMonto: new NumberProp('Nuevo Monto', {
      decimal: true,
      isMoney: true,
      big: true,
      sum: true,
      pre: '$',
    }),
    totalCertificadoFojaMedicion: new NumberProp('Total Certificado de Fojas', {
      decimal: true,
      isMoney: true,
      big: true,
      sum: true,
      pre: '$',
    }),
    totalOrdenPagoFojaMedicion: new NumberProp('Total Orden de Pago de Fojas', {
      decimal: true,
      isMoney: true,
      big: true,
      sum: true,
      pre: '$',
    }),
    totalPagadoFojaMedicion: new NumberProp('Total Pagado de Fojas', {
      decimal: true,
      isMoney: true,
      big: true,
      sum: true,
      pre: '$',
    }),
    totalPendientePagoFojaMedicion: new NumberProp(
      'Total Pendiente de Pago de Fojas',
      {
        decimal: true,
        isMoney: true,
        big: true,
        sum: true,
        pre: '$',
      },
    ),
    totalCertificadoRedeterminacion: new NumberProp(
      'Total Certificado de Redeterm.',
      {
        decimal: true,
        isMoney: true,
        big: true,
        sum: true,
        pre: '$',
      },
    ),
    totalOrdenPagoRedeterminacion: new NumberProp(
      'Total Orden de Pago de Redeterm.',
      {
        decimal: true,
        isMoney: true,
        big: true,
        sum: true,
        pre: '$',
      },
    ),
    totalPagadoRedeterminacion: new NumberProp('Total Pagado de Redeterm.', {
      decimal: true,
      isMoney: true,
      big: true,
      sum: true,
      pre: '$',
    }),
    totalPendientePagoRedeterminacion: new NumberProp(
      'Total Pendiente de Pago de Redeterm.',
      {
        decimal: true,
        isMoney: true,
        big: true,
        sum: true,
        pre: '$',
      },
    ),
    porcentajePendienteCertificar: new NumberProp(
      'Porcentaje Pendiente a Certificar',
      {
        decimal: true,
        sub: '%',
      },
    ),
    montoPendienteCertificar: new NumberProp(
      'Monto Pendiente a Certificar',
      {
        decimal: true,
        isMoney: true,
        big: true,
        sum: true,
        pre: '$',
      },
      MinSize.m,
    ),

    totalPendientePago: new NumberProp('Total Pendiente de Pago de Redeterm.', {
      decimal: true,
      isMoney: true,
      big: true,
      sum: true,
      pre: '$',
    }),

    representantes: new RefListProp({
      getMetaModel: () => RepresentanteMeta,
    }),
    inspectores: new RefListProp({
      getMetaModel: () => InspectorMeta,
    }),
    fojasMedicion: new RefListProp({
      getMetaModel: () => FojaMedicionMeta,
    }),
    redeterminaciones: new RefListProp({
      getMetaModel: () => RedeterminacionMeta,
    }),
    ampliaciones: new RefListProp({
      getMetaModel: () => AmpliacionMeta,
    }),
    modificaciones: new RefListProp({
      getMetaModel: () => ModificacionMeta,
    }),
    paralizaciones: new RefListProp({
      getMetaModel: () => ParalizacionMeta,
    }),
    rescisiones: new RefListProp({
      getMetaModel: () => RescisionMeta,
    }),
    recepciones: new RefListProp({
      getMetaModel: () => RecepcionMeta,
    }),

    ...COMMON_PROPS,
  },
})

const BASICO: (keyof ObraModel.Entity)[] = select(ObraMeta.allFields, 'only', [
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
  'localidad',
  'direccion',
  'lugar',
  'avanceTotal',
  'inaugurada',
  'porcentajePendienteCertificar',
  'totalPendientePago',
  'observaciones',
])

const TOTALES: (keyof ObraModel.Entity)[] = select(ObraMeta.allFields, 'only', [
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

const DERIVADOS: (keyof ObraModel.Entity)[] = select(
  ObraMeta.allFields,
  'only',
  [
    'representantes',
    'inspectores',
    'fojasMedicion',
    'redeterminaciones',
    'ampliaciones',
    'modificaciones',
    'paralizaciones',
    'rescisiones',
    'recepciones',
  ],
)

const QUICK_FILTERS: (keyof ObraModel.Entity)[] = select(
  ObraMeta.allFields,
  'only',
  [
    'empresa',
    'fechaInicio',
    'localidad',
    'tipoEstadoObra',
    'tipoProgramaObra',
    'tipoTematicaObra',
  ],
)

ObraMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: select(ObraMeta.allFields, 'except', [
      ...TOTALES,
      ...DERIVADOS,
    ] as (keyof ObraModel.Entity)[]),
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [
      {
        key: '',
        fields: BASICO,
      },
      {
        key: 'modalidad',
        title: 'Modalidad',
        fields: select(ObraMeta.allFields, 'only', [
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
    fields: select(ObraMeta.allFields, 'only', [
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
      'localidad',
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
      ...select(ObraMeta.allFields, 'only', [
        'empresa',
        'nombre',
        'localidad',
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
        key: '',
        title: '',
        fields: select(ObraMeta.allFields, 'only', [
          'numero',
          'nombre',
          'empresa',
          'localidad',
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
    fields: select(ObraMeta.allFields, 'only', [
      'nombre',
      'empresa',
      'localidad',
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
