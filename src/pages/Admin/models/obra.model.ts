import {
  LocalidadModel,
  EmpresaModel,
  TipoTematicaObraModel,
  TipoContratacionObraModel,
  TipoFinanciamientoObraModel,
  TipoProgramaObraModel,
  TipoEstadoObraModel,
} from '.'
import {
  BooleanProp,
  DateProp,
  NumberProp,
  RefProp,
  MetaModel,
  TextLongProp,
  TextProp,
} from '../services/config'
import { ObraService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'

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

export const scheme = new MetaModel<Entity>({
  key: 'obra',
  service: ObraService,
  refreshRate: 'medium',
  title: {
    singular: 'Obra',
    plural: 'Obras',
  },

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
      getScheme: () => EmpresaModel.scheme,
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
      getScheme: () => TipoContratacionObraModel.scheme,
    }),
    tipoFinanciamientoObra: new RefProp({
      getScheme: () => TipoFinanciamientoObraModel.scheme,
    }),
    tipoProgramaObra: new RefProp({
      getScheme: () => TipoProgramaObraModel.scheme,
    }),
    tipoTematicaObra: new RefProp({
      getScheme: () => TipoTematicaObraModel.scheme,
    }),
    tipoEstadoObra: new RefProp({
      getScheme: () => TipoEstadoObraModel.scheme,
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
      getScheme: () => LocalidadModel.scheme,
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
    ...COMMON_PROPS,
  },
})

// title: 'Modalidad',

// 'Totales de Obra'
// key: 'obraTotales',
// quickFilters: ['empresa', 'fechaInicio', 'localidad', 'tipoEstadoObra'],
