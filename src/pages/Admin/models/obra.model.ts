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
  numero: number
}

export interface Ref {
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
  refreshRate: 'medium',
  title: {
    singular: 'Obra',
    plural: 'Obras',
  },

  groups: [
    {
      props: {
        numero: new NumberProp('numero', 'Número', {
          big: true,
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
        ),
        numeroResolucion: new TextProp(
          'numeroResolucion',
          'Número de Resolución',
        ),
        anioResolucion: new NumberProp('anioResolucion', 'Año de Resolución', {
          field: {
            required: true,
          },
        }),
        numeroContratacion: new TextProp(
          'numeroContratacion',
          'Número de Contratación',
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
          'Monto de Contratación',
          {
            decimal: true,
            big: true,
            pre: '$',
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
        fechaInicio: new DateProp('fechaInicio', 'Fecha de Inicio'),
        fechaFin: new DateProp('fechaFin', 'Fecha de Fin'),
        plazoMeses: new NumberProp('plazoMeses', 'Plazo en Meses'),
        plazoDias: new NumberProp('plazoDias', 'Plazo en Días'),
        localidad: new RefProp('localidad', {
          getScheme: () => LocalidadModel.scheme,
        }),
        direccion: new TextProp('direccion', 'Dirección'),
        lugar: new TextLongProp('lugar', 'Lugar'),
        nomenclaturaCatastral: new TextProp(
          'nomenclaturaCatastral',
          'Nomenclatura Catastral',
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
          {
            decimal: true,
            sub: '%',
          },
        ),
        metrosCuadradosObraNueva: new NumberProp(
          'metrosCuadradosObraNueva',
          'm² (metros cuadrados) de obra nueva',
          {
            decimal: true,
            sub: 'm²',
          },
        ),
        metrosLinealesObraNueva: new NumberProp(
          'metrosLinealesObraNueva',
          'm (metros lineales) de obra nueva',
          {
            decimal: true,
            sub: 'm',
          },
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
          {
            decimal: true,
            sub: '%',
          },
        ),
        metrosCuadradosObraRefaccionada: new NumberProp(
          'metrosCuadradosObraRefaccionada',
          'm² (metros cuadrados) de obra refaccionada',
          {
            decimal: true,
            sub: 'm²',
          },
        ),
        metrosLinealesObraRefaccionada: new NumberProp(
          'metrosLinealesObraRefaccionada',
          'm (metros lineales) de obra refaccionada',
          {
            decimal: true,
            sub: 'm',
          },
        ),
        observacionesObraRefaccionada: new TextLongProp(
          'observacionesObraRefaccionada',
          'Observaciones de obra refaccionada',
        ),
        ...COMMON_PROPS,
      },
    },
  ],
}
