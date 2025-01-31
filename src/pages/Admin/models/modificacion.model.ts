import { Ref } from '@/types'
import { ObraModel, TipoModificacionModel } from '.'
import {
  DateProp,
  NumberProp,
  TextLongProp,
  RefProp,
  Scheme,
  TextProp,
} from '../services/config'
import {
  ObraService,
  TipoModificacionService,
  ModificacionService,
} from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  numeroExpediente: string
  numeroResolucion: string
  monto: number
  nuevoMontoObra: number
  fecha: string
  observaciones: string

  obra?: ObraModel.RawRef
  tipoModificacion?: TipoModificacionModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  numeroExpediente: string
  numeroResolucion: string
  monto: number
  nuevoMontoObra: number
  fecha: string
  observaciones: string

  obra?: Ref
  tipoModificacion?: Ref

  creado: string
  modificado: string
}

export interface RawRef {
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

export const scheme: Scheme<Entity> = {
  key: 'modificacion',
  service: ModificacionService,
  title: {
    singular: 'Modificación',
    plural: 'Modificaciones',
  },
  refAnchorField: 'Nombre',

  groups: [
    {
      props: {
        numeroExpediente: new TextProp(
          'numeroExpediente',
          'Número De Expediente',
          {
            field: {
              required: true,
            },
          },
        ),
        numeroResolucion: new TextProp(
          'numeroResolucion',
          'Número De Resolución',
          {
            field: {
              required: true,
            },
          },
        ),
        monto: new NumberProp('monto', 'Monto', {
          decimal: true,
          pre: '$',
          field: { required: true },
        }),

        nuevoMontoObra: new NumberProp('nuevoMontoObra', 'Nuevo Monto', {
          decimal: true,
          pre: '$',
          field: { required: true },
        }),

        fecha: new DateProp('fecha', 'Fecha', { field: { required: true } }),

        observaciones: new TextLongProp('observaciones', 'Observaciones'),

        obra: new RefProp('obra', {
          getScheme: () => ObraModel.scheme,
        }),

        tipoModificacion: new RefProp('tipoModificacion', {
          getScheme: () => TipoModificacionModel.scheme,
        }),

        ...COMMON_PROPS,
      },
    },
  ],
}
