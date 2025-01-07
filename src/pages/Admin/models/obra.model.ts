import {
  LocalidadModel,
  EmpresaModel,
  TipoTematicaObraModel,
  TipoContratacionObraModel,
  TipoFinanciamientoObraModel,
  TipoProgramaObraModel,
  TipoEstadoObraModel,
} from '.'
import { Ref } from '@/types'
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
  anioContratacion?: number
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

  empresa?: EmpresaModel.RawRef
  tipoContratacionObra?: TipoTematicaObraModel.RawRef
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
  anioContratacion?: number
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

  empresa?: Ref
  tipoContratacionObra?: Ref
  tipoFinanciamientoObra?: Ref
  tipoProgramaObra?: Ref
  tipoTematicaObra?: Ref
  tipoEstadoObra?: Ref
  localidad?: Ref

  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  numero: number
}

export interface CreateData {
  numero: number
  nombre: string
  numeroExpediente?: number
  numeroResolucion?: number
  anioResolucion?: string
  numeroContratacion?: number
  anioContratacion?: number
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
  anioContratacion?: number
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

  empresaId?: number
  tipoContratacionObraId?: number
  tipoFinanciamientoObraId?: number
  tipoProgramaObraId?: number
  tipoTematicaObraId?: number
  tipoEstadoObraId?: number
  localidadId?: number
}

export const scheme: Scheme<Entity> = {
  key: 'obra',
  service: ObraService,
  title: {
    singular: 'Obra',
    plural: 'Obras',
  },

  groups: [
    {
      props: {
        ...COMMON_PROPS,
        numero: new NumberProp('numero', 'Número', {
          field: {
            required: true,
          },
        }),
        nombre: new TextProp('nombre', 'Nombre', {
          field: {
            required: true,
          },
        }),
        empresa: new RefProp('empresa', {
          getScheme: () => EmpresaModel.scheme,
        }),
        numeroExpediente: new TextProp(
          'numeroExpediente',
          'Número de Expediente',
          {
            field: {
              required: true,
            },
          },
        ),
        numeroResolucion: new TextProp(
          'numeroResolucion',
          'Número de Resolución',
          {
            field: {
              required: true,
            },
          },
        ),
        anioResolucion: new NumberProp('anioResolucion', 'Año de Resolución', {
          field: {
            required: true,
          },
        }),
        numeroContratacion: new TextProp(
          'numeroContratacion',
          'Número de Contratación',
          {
            field: {
              required: true,
            },
          },
        ),
        anioContratacion: new NumberProp(
          'anioContratacion',
          'Año de Contratación',
          {
            field: {
              required: true,
            },
          },
        ),
        montoContratacion: new NumberProp(
          'montoContratacion',
          'Año de Contratación',
          {
            field: {
              required: true,
            },
          },
        ),
        tipoContratacionObra: new RefProp('tipoContratacionObra', {
          getScheme: () => TipoContratacionObraModel.scheme,
        }),
        tipoFinanciamientoObra: new RefProp('tipoFinanciamientoObra', {
          getScheme: () => TipoFinanciamientoObraModel.scheme,
        }),
        tipoProgramaObra: new RefProp('tipoProgramaObra', {
          getScheme: () => TipoProgramaObraModel.scheme,
        }),
        tipoTematicaObra: new RefProp('tipoTematicaObra', {
          getScheme: () => TipoTematicaObraModel.scheme,
        }),
        tipoEstadoObra: new RefProp('tipoEstadoObra', {
          getScheme: () => TipoEstadoObraModel.scheme,
        }),
        fechaInicio: new DateProp('fechaInicio', 'Fecha de Inicio', {
          field: {
            required: true,
          },
        }),
        fechaFin: new DateProp('fechaFin', 'Fecha de Fin', {
          field: {
            required: true,
          },
        }),
        plazoMeses: new NumberProp('plazoMeses', 'Plazo en Meses', {
          field: {
            required: true,
          },
        }),
        plazoDias: new NumberProp('plazoDias', 'Plazo en Días', {
          field: {
            required: true,
          },
        }),
        localidad: new RefProp('localidad', {
          getScheme: () => LocalidadModel.scheme,
        }),
        direccion: new TextProp('direccion', 'Dirección', {
          field: {
            required: true,
          },
        }),
        lugar: new TextProp('lugar', 'Lugar', {
          field: {
            required: true,
          },
        }),
        nomenclaturaCatastral: new TextProp(
          'nomenclaturaCatastral',
          'Nomenclatura Catastral',
          {
            field: {
              required: true,
            },
          },
        ),
        observaciones: new TextLongProp(
          'observaciones',
          'Observaciones generales',
        ),
      },
    },
    {
      title: 'Modalidad',
      props: {
        obraNueva: new BooleanProp('obraNueva', 'Obra nueva'),
        porcentajeObraNueva: new NumberProp(
          'porcentajeObraNueva',
          'Porcentaje de obra nueva',
        ),
        metrosCuadradosObraNueva: new NumberProp(
          'metrosCuadradosObraNueva',
          'm² (metros cuadrados) de obra nueva',
        ),
        metrosLinealesObraNueva: new NumberProp(
          'metrosLinealesObraNueva',
          'm (metros lineales) de obra nueva',
        ),
        observacionesObraNueva: new TextLongProp(
          'observacionesObraNueva',
          'Observaciones de obra nueva',
        ),
        obraRefaccionada: new BooleanProp(
          'obraRefaccionada',
          'Obra refaccionada',
        ),
        porcentajeObraRefaccionada: new NumberProp(
          'porcentajeObraRefaccionada',
          'Porcentaje de obra refaccionada',
        ),
        metrosCuadradosObraRefaccionada: new NumberProp(
          'metrosCuadradosObraRefaccionada',
          'm² (metros cuadrados) de obra refaccionada',
        ),
        metrosLinealesObraRefaccionada: new NumberProp(
          'metrosLinealesObraRefaccionada',
          'm (metros lineales) de obra refaccionada',
        ),
        observacionesObraRefaccionada: new TextLongProp(
          'observacionesObraRefaccionada',
          'Observaciones de obra refaccionada',
        ),
      },
    },
  ],
}

// TODO module InspectorObra
