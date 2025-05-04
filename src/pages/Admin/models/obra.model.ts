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
  Scheme,
  TextLongProp,
  TextProp,
} from '../services/config'
import { ObraService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  numero: number
  nombre: string
  numeroExpediente?: number
  numeroResolucion?: number
  anioResolucion?: string
  numeroContratacion?: number
  fechaContratacion?: string
  montoContratacion?: number
  fechaInicio?: string
  fechaFin?: string
  plazoMeses?: number
  plazoDias?: number
  direccion?: string
  lugar?: string
  nomenclaturaCatastral?: string
  observaciones?: string
  obraNueva: boolean
  porcentajeObraNueva?: number
  metrosCuadradosObraNueva?: number
  metrosLinealesObraNueva?: number
  observacionesObraNueva?: string
  obraRefaccionada: boolean
  porcentajeObraRefaccionada?: number
  metrosCuadradosObraRefaccionada?: number
  metrosLinealesObraRefaccionada?: number
  observacionesObraRefaccionada?: string
  avanceTotal?: number

  empresa?: EmpresaModel.RawRef
  tipoContratacionObra?: TipoContratacionObraModel.RawRef
  tipoFinanciamientoObra?: TipoFinanciamientoObraModel.RawRef
  tipoProgramaObra?: TipoProgramaObraModel.RawRef
  tipoTematicaObra?: TipoTematicaObraModel.RawRef
  tipoEstadoObra?: TipoEstadoObraModel.RawRef
  localidad?: LocalidadModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  numero: number
  nombre: string
  numeroExpediente?: number
  numeroResolucion?: number
  anioResolucion?: string
  numeroContratacion?: number
  fechaContratacion?: string
  montoContratacion?: number
  fechaInicio?: string
  fechaFin?: string
  plazoMeses?: number
  plazoDias?: number
  direccion?: string
  lugar?: string
  nomenclaturaCatastral?: string
  observaciones?: string
  obraNueva: boolean
  porcentajeObraNueva?: number
  metrosCuadradosObraNueva?: number
  metrosLinealesObraNueva?: number
  observacionesObraNueva?: string
  obraRefaccionada: boolean
  porcentajeObraRefaccionada?: number
  metrosCuadradosObraRefaccionada?: number
  metrosLinealesObraRefaccionada?: number
  observacionesObraRefaccionada?: string
  avanceTotal?: number

  empresa?: EmpresaModel.Ref
  tipoContratacionObra?: TipoContratacionObraModel.Ref
  tipoFinanciamientoObra?: TipoFinanciamientoObraModel.Ref
  tipoProgramaObra?: TipoProgramaObraModel.Ref
  tipoTematicaObra?: TipoTematicaObraModel.Ref
  tipoEstadoObra?: TipoEstadoObraModel.Ref
  localidad?: LocalidadModel.Ref

  creado: string
  modificado: string
}

export interface RawRef {
  id: number

  nombre: string
  numero: number
}

export interface Ref {
  id: number

  nombre: string
  numero: number
}

export interface CreateEntity {
  numero: number
  nombre: string
  numeroExpediente?: number
  numeroResolucion?: number
  anioResolucion?: string
  numeroContratacion?: number
  fechaContratacion?: string
  montoContratacion?: number
  fechaInicio?: string
  fechaFin?: string
  plazoMeses?: number
  plazoDias?: number
  direccion?: string
  lugar?: string
  nomenclaturaCatastral?: string
  observaciones?: string
  obraNueva: boolean
  porcentajeObraNueva?: number
  metrosCuadradosObraNueva?: number
  metrosLinealesObraNueva?: number
  observacionesObraNueva?: string
  obraRefaccionada: boolean
  porcentajeObraRefaccionada?: number
  metrosCuadradosObraRefaccionada?: number
  metrosLinealesObraRefaccionada?: number
  observacionesObraRefaccionada?: string
  avanceTotal?: number

  empresaId?: number
  tipoContratacionObraId?: number
  tipoFinanciamientoObraId?: number
  tipoProgramaObraId?: number
  tipoTematicaObraId?: number
  tipoEstadoObraId?: number
  localidadId?: number
}

export interface CreateBody {
  numero: number
  nombre: string
  numeroExpediente?: number
  numeroResolucion?: number
  anioResolucion?: string
  numeroContratacion?: number
  fechaContratacion?: string
  montoContratacion?: number
  fechaInicio?: string
  fechaFin?: string
  plazoMeses?: number
  plazoDias?: number
  direccion?: string
  lugar?: string
  nomenclaturaCatastral?: string
  observaciones?: string
  obraNueva: boolean
  porcentajeObraNueva?: number
  metrosCuadradosObraNueva?: number
  metrosLinealesObraNueva?: number
  observacionesObraNueva?: string
  obraRefaccionada: boolean
  porcentajeObraRefaccionada?: number
  metrosCuadradosObraRefaccionada?: number
  metrosLinealesObraRefaccionada?: number
  observacionesObraRefaccionada?: string
  avanceTotal?: number

  empresaId?: number
  tipoContratacionObraId?: number
  tipoFinanciamientoObraId?: number
  tipoProgramaObraId?: number
  tipoTematicaObraId?: number
  tipoEstadoObraId?: number
  localidadId?: number
}

export type UpdateEntity = Partial<CreateEntity>

export type UpdateBody = Partial<CreateBody>

export const scheme: Scheme<Entity> = {
  key: 'obra',
  service: ObraService,
  refreshRate: 'medium',
  title: {
    singular: 'Obra',
    plural: 'Obras',
  },
  anchorField: 'nombre',

  groups: [
    {
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
      },
    },
    {
      title: 'Modalidad',
      props: {
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
        ...COMMON_PROPS,
      },
    },
  ],
}
