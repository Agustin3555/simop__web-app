import {
  LocalidadModel,
  EmpresaModel,
  TipoTematicaObraModel,
  TipoContratacionObraModel,
  TipoFinanciamientoObraModel,
  TipoProgramaObraModel,
  TipoEstadoObraModel,
  AmpliacionModel,
  RepresentanteModel,
  InspectorModel,
  FojaMedicionModel,
  RedeterminacionModel,
  ModificacionModel,
  ParalizacionModel,
  RescisionModel,
  RecepcionModel,
} from '.'
import {
  BooleanProp,
  DateProp,
  NumberProp,
  RefProp,
  MetaModel,
  TextLongProp,
  TextProp,
  RefListProp,
} from '../services/config'
import { ObraService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'
import { Method } from '@/services/config'
import { select } from '../helpers'

export interface OwnFields {
  numero: number
  nombre: string
  numeroExpediente: number
  numeroResolucion: number
  anioResolucion: string
  numeroContratacion: number
  fechaContratacion: string
  montoContratacion: number
  fechaInicio: string
  fechaFin: string
  plazoMeses: number
  plazoDias: number
  direccion: string
  lugar: string
  nomenclaturaCatastral: string
  observaciones: string
  obraNueva: boolean
  porcentajeObraNueva: number
  metrosCuadradosObraNueva: number
  metrosLinealesObraNueva: number
  observacionesObraNueva: string
  obraRefaccionada: boolean
  porcentajeObraRefaccionada: number
  metrosCuadradosObraRefaccionada: number
  metrosLinealesObraRefaccionada: number
  observacionesObraRefaccionada: string
  avanceTotal: number

  balanceEconomico: string
  nuevoMonto: string

  totalCertificadoFojaMedicion: string
  totalOrdenPagoFojaMedicion: string
  totalPagadoFojaMedicion: string
  totalPendientePagoFojaMedicion: string

  totalCertificadoRedeterminacion: string
  totalOrdenPagoRedeterminacion: string
  totalPagadoRedeterminacion: string
  totalPendientePagoRedeterminacion: string

  porcentajePendienteCertificar: number
  montoPendienteCertificar: string
}

export interface RelationFields {
  empresa: EmpresaModel.Ref
  tipoContratacionObra: TipoContratacionObraModel.Ref
  tipoFinanciamientoObra: TipoFinanciamientoObraModel.Ref
  tipoProgramaObra: TipoProgramaObraModel.Ref
  tipoTematicaObra: TipoTematicaObraModel.Ref
  tipoEstadoObra: TipoEstadoObraModel.Ref
  localidad: LocalidadModel.Ref

  representantes: RepresentanteModel.Ref[]
  inspectores: InspectorModel.Ref[]
  fojasMedicion: FojaMedicionModel.Ref[]
  redeterminaciones: RedeterminacionModel.Ref[]
  ampliaciones: AmpliacionModel.Ref[]
  modificaciones: ModificacionModel.Ref[]
  paralizaciones: ParalizacionModel.Ref[]
  rescisiones: RescisionModel.Ref[]
  recepciones: RecepcionModel.Ref[]
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<
    | 'empresaId'
    | 'tipoContratacionObraId'
    | 'tipoFinanciamientoObraId'
    | 'tipoProgramaObraId'
    | 'tipoTematicaObraId'
    | 'tipoEstadoObraId'
    | 'localidadId',
    number
  >

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'nombre' | 'numero'>

export const metaModel = new MetaModel<Entity>({
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
      getMetaModel: () => EmpresaModel.metaModel,
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
      getMetaModel: () => TipoContratacionObraModel.metaModel,
    }),
    tipoFinanciamientoObra: new RefProp({
      getMetaModel: () => TipoFinanciamientoObraModel.metaModel,
    }),
    tipoProgramaObra: new RefProp({
      getMetaModel: () => TipoProgramaObraModel.metaModel,
    }),
    tipoTematicaObra: new RefProp({
      getMetaModel: () => TipoTematicaObraModel.metaModel,
    }),
    tipoEstadoObra: new RefProp({
      getMetaModel: () => TipoEstadoObraModel.metaModel,
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
      getMetaModel: () => LocalidadModel.metaModel,
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
      getMetaModel: () => RepresentanteModel.metaModel,
    }),
    inspectores: new RefListProp({
      getMetaModel: () => InspectorModel.metaModel,
    }),
    fojasMedicion: new RefListProp({
      getMetaModel: () => FojaMedicionModel.metaModel,
    }),
    redeterminaciones: new RefListProp({
      getMetaModel: () => RedeterminacionModel.metaModel,
    }),
    ampliaciones: new RefListProp({
      getMetaModel: () => AmpliacionModel.metaModel,
    }),
    modificaciones: new RefListProp({
      getMetaModel: () => ModificacionModel.metaModel,
    }),
    paralizaciones: new RefListProp({
      getMetaModel: () => ParalizacionModel.metaModel,
    }),
    rescisiones: new RefListProp({
      getMetaModel: () => RescisionModel.metaModel,
    }),
    recepciones: new RefListProp({
      getMetaModel: () => RecepcionModel.metaModel,
    }),

    ...COMMON_PROPS,
  },
})

const BASICO: (keyof Entity)[] = select(metaModel.allFields, 'only', [
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

const TOTALES: (keyof Entity)[] = select(metaModel.allFields, 'only', [
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

const DERIVADOS: (keyof Entity)[] = select(metaModel.allFields, 'only', [
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

metaModel.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: select(metaModel.allFields, 'except', [
      ...TOTALES,
      ...DERIVADOS,
    ] as (keyof Entity)[]),
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
        fields: select(metaModel.allFields, 'only', [
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
    fields: select(metaModel.allFields, 'only', [
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
    fields: select(metaModel.allFields, 'only', [
      'empresa',
      'fechaInicio',
      'localidad',
      'tipoEstadoObra',
    ]),
  },
  {
    methods: ['totales'],
    fields: [
      ...select(metaModel.allFields, 'only', [
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
    ] as (keyof Entity)[],
  },
  {
    methods: ['totales-quickFilters'],
    fields: select(metaModel.allFields, 'only', [
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
