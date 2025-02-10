import { Ref } from '@/types'
import { ObraModel, TipoRecepcionModel } from '.'
import {
  DateProp,
  TextLongProp,
  RefProp,
  Scheme,
  NumberProp,
} from '../services/config'
import { RecepcionService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  numeroActa: number
  fecha: string
  observaciones: string

  obra?: ObraModel.RawRef
  tipoRecepcion?: TipoRecepcionModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  numeroActa: number
  fecha: string
  observaciones: string

  obra?: Ref
  tipoRecepcion?: Ref

  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  numeroActa: number
}

export interface CreateData {
  numeroActa: number
  fecha: string
  observaciones: string

  obraId: number
  tipoRecepcionId: number
}

export interface CreateBody {
  numeroActa: number
  fecha: string
  observaciones: string

  obraId: number
  tipoRecepcionId: number
}

export const scheme: Scheme<Entity> = {
  key: 'Recepcion',
  service: RecepcionService,
  refreshRate: 'medium',
  title: {
    singular: 'Recepcion',
    plural: 'Recepciones',
  },
  refAnchorField: 'Nombre',

  groups: [
    {
      props: {
        numeroActa: new NumberProp('numeroActa', 'Número De Acta', {
          field: {
            required: true,
          },
        }),
        fecha: new DateProp('fecha', 'Fecha', { field: { required: true } }),

        observaciones: new TextLongProp('observaciones', 'Observaciones'),

        obra: new RefProp('obra', {
          getScheme: () => ObraModel.scheme,
        }),

        tipoRecepcion: new RefProp('tipoRecepcion', {
          getScheme: () => TipoRecepcionModel.scheme,
        }),

        ...COMMON_PROPS,
      },
    },
  ],
}
