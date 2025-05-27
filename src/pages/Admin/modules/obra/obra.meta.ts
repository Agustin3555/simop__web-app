import {
  BooleanProp,
  DateProp,
  NumberProp,
  RefProp,
  MetaModel,
  TextLongProp,
  TextProp,
  RefListProp,
} from '../../services/config'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { select } from '../../helpers'
import { ObraModel, ObraService } from '.'
import { EmpresaMeta } from '../empresa'
import { AmpliacionMeta } from '../ampliacion'
import { FojaMedicionMeta } from '../fojaMedicion'
import { InspectorMeta } from '../inspector'
import { LocalidadMeta } from '../localidad'
import { ParalizacionMeta } from '../paralizacion'
import { RecepcionMeta } from '../recepcion/recepcion.meta'
import { RedeterminacionMeta } from '../redeterminacion'
import { RepresentanteMeta } from '../representante'
import { RescisionMeta } from '../rescision/rescision.meta'
import { TipoContratacionObraMeta } from '../tipoContratacionObra'
import { TipoEstadoObraMeta } from '../tipoEstadoObra'
import { TipoFinanciamientoObraMeta } from '../tipoFinanciamientoObra'
import { TipoProgramaObraMeta } from '../tipoProgramaObra'
import { TipoTematicaObraMeta } from '../tipoTematicaObra'
import { ModificacionMeta } from '../modificacion'

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
      field: {
        required: true,
      },
    }),
    nombre: new TextProp('Nombre', {
      field: {
        required: true,
      },
    }),
    empresa: new RefProp({
      getMetaModel: () => EmpresaMeta,
    }),
    numeroExpediente: new TextProp('Número de Expediente de Contrato'),
    numeroResolucion: new TextProp('Número de Resolución'),
    anioResolucion: new NumberProp('Año de Resolución'),
    numeroContratacion: new TextProp('Número de Contratación'),
    fechaContratacion: new DateProp('Fecha de Contratación'),
    montoContratacion: new NumberProp('Monto de Contratación', {
      decimal: true,
      isMoney: true,
      big: true,
      sum: true,
      pre: '$',
    }),
    tipoContratacionObra: new RefProp({
      getMetaModel: () => TipoContratacionObraMeta,
    }),
    tipoFinanciamientoObra: new RefProp({
      getMetaModel: () => TipoFinanciamientoObraMeta,
    }),
    tipoProgramaObra: new RefProp({
      getMetaModel: () => TipoProgramaObraMeta,
    }),
    tipoTematicaObra: new RefProp({
      getMetaModel: () => TipoTematicaObraMeta,
    }),
    tipoEstadoObra: new RefProp({
      getMetaModel: () => TipoEstadoObraMeta,
    }),
    fechaInicio: new DateProp('Fecha de Inicio'),
    fechaFin: new DateProp('Fecha de Fin'),
    plazoMeses: new NumberProp('Plazo en Meses'),
    plazoDias: new NumberProp('Plazo en Días'),
    avanceTotal: new NumberProp('Porcentaje de Avance Total', {
      decimal: true,
      sub: '%',
    }),
    nomenclaturaCatastral: new TextProp('Nomenclatura Catastral'),
    localidad: new RefProp({
      getMetaModel: () => LocalidadMeta,
    }),
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
    montoPendienteCertificar: new NumberProp('Monto Pendiente a Certificar', {
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
  'empresa',
  'numeroExpediente',
  'numeroResolucion',
  'anioResolucion',
  'numeroContratacion',
  'fechaContratacion',
  'montoContratacion',
  'tipoContratacionObra',
  'tipoFinanciamientoObra',
  'tipoProgramaObra',
  'tipoTematicaObra',
  'tipoEstadoObra',
  'fechaInicio',
  'fechaFin',
  'plazoMeses',
  'plazoDias',
  'avanceTotal',
  'nomenclaturaCatastral',
  'localidad',
  'direccion',
  'lugar',
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
      'tipoEstadoObra',
      'fechaInicio',
      'avanceTotal',
      'localidad',
    ]),
  },
  {
    methods: ['general-quickFilters'],
    fields: select(ObraMeta.allFields, 'only', [
      'empresa',
      'fechaInicio',
      'localidad',
      'tipoEstadoObra',
    ]),
  },
  {
    methods: ['totales'],
    fields: [
      ...select(ObraMeta.allFields, 'only', [
        'numero',
        'nombre',
        'empresa',
        'localidad',
        'numeroExpediente',
        'fechaInicio',
        'tipoEstadoObra',
        'avanceTotal',
        'montoContratacion',
      ]),
      ...TOTALES,
    ] as (keyof ObraModel.Entity)[],
  },
  {
    methods: ['totales-quickFilters'],
    fields: select(ObraMeta.allFields, 'only', [
      'empresa',
      'fechaInicio',
      'localidad',
      'tipoEstadoObra',
    ]),
  },
  {
    methods: ['detalle'],
    groups: [
      {
        key: '',
        title: '',
        fields: BASICO,
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
]
