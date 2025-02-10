import { Ref } from '@/types'
import { ObraModel, TipoRescisionModel } from '.'
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
  numeroResolucion: string
  fecha: string
  observaciones: string

  obra?: ObraModel.RawRef
  tipoRescision?: TipoRescisionModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  numeroExpediente: string
  numeroResolucion: string
  fecha: string
  observaciones: string

  obra?: Ref
  tipoRescision?: Ref

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
  fecha: string
  observaciones: string

  obraId: number
  tipoRescisionId: number
}

export interface CreateBody {
  numeroExpediente: string
  numeroResolucion: string
  fecha: string
  observaciones: string

  obraId: number
  tipoRescisionId: number
}

export const scheme: Scheme<Entity> = {
  key: 'rescision',
  service: RescisionService,
  refreshRate: 'medium',
  title: {
    singular: 'Rescision',
    plural: 'Rescisiones',
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
        fecha: new DateProp('fecha', 'Fecha', { field: { required: true } }),

        observaciones: new TextLongProp('observaciones', 'Observaciones'),

        obra: new RefProp('obra', {
          getScheme: () => ObraModel.scheme,
        }),

        tipoRescision: new RefProp('tipoRescision', {
          getScheme: () => TipoRescisionModel.scheme,
        }),

        ...COMMON_PROPS,
      },
    },
  ],
}
