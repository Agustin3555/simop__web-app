import {
  ObraModel,
  TipoRescisionModel,
  DireccionModel,
  DepartamentoModel,
} from '.'
import {
  DateProp,
  TextLongProp,
  RefProp,
  Scheme,
  TextProp,
} from '../services/config'
import { RescisionService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  numeroExpediente: string
  numeroResolucion?: string
  fecha?: string
  observaciones?: string

  direccion?: DireccionModel.RawRef
  departamento?: DepartamentoModel.RawRef
  obra?: ObraModel.RawRef
  tipoRescision?: TipoRescisionModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  numeroExpediente: string
  numeroResolucion?: string
  fecha?: string
  observaciones?: string

  direccion?: DireccionModel.Ref
  departamento?: DepartamentoModel.Ref
  obra?: ObraModel.Ref
  tipoRescision?: TipoRescisionModel.Ref

  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  numeroExpediente: string
}

export interface Ref {
  id: number
  numeroExpediente: string
}

export interface CreateData {
  numeroExpediente: string
  numeroResolucion: string
  fecha: string
  observaciones: string

  direccionId?: number
  departamentoId?: number
  obraId: number
  tipoRescisionId: number
}

export interface CreateBody {
  numeroExpediente: string
  numeroResolucion: string
  fecha: string
  observaciones: string

  direccionId?: number
  departamentoId?: number
  obraId: number
  tipoRescisionId: number
}

export interface UpdateData {
  numeroExpediente?: string
  numeroResolucion?: string
  fecha?: string
  observaciones?: string

  direccionId?: number
  departamentoId?: number
  obraId?: number
  tipoRescisionId?: number
}

export interface UpdateBody {
  numeroExpediente?: string
  numeroResolucion?: string
  fecha?: string
  observaciones?: string

  direccionId?: number
  departamentoId?: number
  obraId?: number
  tipoRescisionId?: number
}

export const scheme: Scheme<Entity> = {
  key: 'rescision',
  service: RescisionService,
  refreshRate: 'medium',
  title: {
    singular: 'Rescision',
    plural: 'Rescisiones',
  },
  anchorField: 'numeroExpediente',

  groups: [
    {
      props: {
        obra: new RefProp({
          getScheme: () => ObraModel.scheme,
          field: {
            required: true,
          },
        }),
        numeroExpediente: new TextProp('Número De Expediente', {
          field: {
            required: true,
          },
        }),
        numeroResolucion: new TextProp('Número De Resolución'),
        fecha: new DateProp('Fecha'),
        tipoRescision: new RefProp({
          getScheme: () => TipoRescisionModel.scheme,
        }),
        direccion: new RefProp({
          getScheme: () => DireccionModel.scheme,
        }),
        departamento: new RefProp({
          getScheme: () => DepartamentoModel.scheme,
        }),
        observaciones: new TextLongProp('Observaciones'),
        ...COMMON_PROPS,
      },
    },
  ],
}
