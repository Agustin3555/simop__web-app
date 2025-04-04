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
  fecha?: string
  observaciones?: string

  obra?: ObraModel.RawRef
  tipoRecepcion?: TipoRecepcionModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  numeroActa: number
  fecha?: string
  observaciones?: string

  obra?: ObraModel.Ref
  tipoRecepcion?: TipoRecepcionModel.Ref
  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  numeroActa: number
}

export interface Ref {
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

export interface UpdateData {
  numeroActa?: number
  fecha?: string
  observaciones?: string

  obraId?: number
  tipoRecepcionId?: number
}

export interface UpdateBody {
  numeroActa?: number
  fecha?: string
  observaciones?: string

  obraId?: number
  tipoRecepcionId?: number
}

export const scheme: Scheme<Entity> = {
  key: 'Recepcion',
  service: RecepcionService,
  refreshRate: 'medium',
  title: {
    singular: 'Recepcion',
    plural: 'Recepciones',
  },
  anchorField: 'numeroActa',

  groups: [
    {
      props: {
        obra: new RefProp({
          getScheme: () => ObraModel.scheme,
          field: {
            required: true,
          },
        }),
        numeroActa: new NumberProp('Número De Acta', {
          field: {
            required: true,
          },
        }),
        fecha: new DateProp('Fecha'),
        tipoRecepcion: new RefProp({
          getScheme: () => TipoRecepcionModel.scheme,
        }),
        observaciones: new TextLongProp('Observaciones'),
        ...COMMON_PROPS,
      },
    },
  ],
}
