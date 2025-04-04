import { ObraModel, TipoModificacionModel } from '.'
import {
  DateProp,
  NumberProp,
  TextLongProp,
  RefProp,
  Scheme,
  TextProp,
} from '../services/config'
import { ModificacionService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  numeroExpediente: string
  numeroResolucion?: string
  monto?: number
  nuevoMontoObra?: number
  fecha?: string
  observaciones?: string

  obra?: ObraModel.RawRef
  tipoModificacion?: TipoModificacionModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  numeroExpediente: string
  numeroResolucion?: string
  monto?: number
  nuevoMontoObra?: number
  fecha?: string
  observaciones?: string

  obra?: ObraModel.Ref
  tipoModificacion?: TipoModificacionModel.Ref

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
  monto: number
  nuevoMontoObra: number
  fecha: string
  observaciones: string

  obraId: number
  tipoModificacionId: number
}

export interface CreateBody {
  numeroExpediente: string
  numeroResolucion: string
  monto: number
  nuevoMontoObra: number
  fecha: string
  observaciones: string

  obraId: number
  tipoModificacionId: number
}

export interface UpdateData {
  numeroExpediente?: string
  numeroResolucion?: string
  monto?: number
  nuevoMontoObra?: number
  fecha?: string
  observaciones?: string

  obraId?: number
  tipoModificacionId?: number
}

export interface UpdateBody {
  numeroExpediente?: string
  numeroResolucion?: string
  monto?: number
  nuevoMontoObra?: number
  fecha?: string
  observaciones?: string

  obraId?: number
  tipoModificacionId?: number
}

export const scheme: Scheme<Entity> = {
  key: 'modificacion',
  service: ModificacionService,
  refreshRate: 'medium',
  title: {
    singular: 'Modificación',
    plural: 'Modificaciones',
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
        monto: new NumberProp('Monto', {
          decimal: true,
          isMoney: true,
          big: true,
          sum: true,
          pre: '$',
        }),
        nuevoMontoObra: new NumberProp('Nuevo Monto', {
          decimal: true,
          isMoney: true,
          big: true,
          sum: true,
          pre: '$',
        }),
        fecha: new DateProp('Fecha'),
        tipoModificacion: new RefProp({
          getScheme: () => TipoModificacionModel.scheme,
        }),
        observaciones: new TextLongProp('Observaciones'),
        ...COMMON_PROPS,
      },
    },
  ],
}
