import { ObraModel, InspectorModel } from '.'
import {
  NumberProp,
  RefProp,
  Scheme,
  TextProp,
  TextLongProp,
  DateProp,
} from '../services/config'
import { FojaMedicionService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  numero: number
  numeroExpediente: string
  avance: number
  fecha: string
  observaciones: string

  obra?: ObraModel.RawRef
  inspector?: InspectorModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  numero: number
  numeroExpediente: string
  avance: number
  fecha: string
  observaciones: string

  obra?: ObraModel.Ref
  inspector?: InspectorModel.Ref

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
  numero: number
  numeroExpediente: string
  avance: number
  fecha: string
  observaciones: string

  obraId?: number
  inspectorId?: number

  creado: string
  modificado: string
}

export interface CreateBody {
  numero: number
  numeroExpediente: string
  avance: number
  fecha: string
  observaciones: string

  obraId?: number
  inspectorId?: number

  creado: string
  modificado: string
}

export const scheme: Scheme<Entity> = {
  key: 'fojaMedicion',
  service: FojaMedicionService,
  refreshRate: 'medium',
  title: {
    singular: 'Foja de Medición',
    plural: 'Fojas de Mediciones',
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
        numeroExpediente: new TextProp('Numero de Expediente de la foja', {
          field: {
            required: true,
          },
        }),
        numero: new NumberProp('Número de foja', {
          field: {
            required: true,
          },
        }),
        avance: new NumberProp('Porcentaje de avance', {
          decimal: true,
          sub: '%',
        }),
        fecha: new DateProp('Fecha', {
          field: {
            required: true,
          },
        }),

        inspector: new RefProp({
          getScheme: () => InspectorModel.scheme,
          field: {
            required: true,
          },
        }),
        observaciones: new TextLongProp('Observaciones'),
        ...COMMON_PROPS,
      },
    },
  ],
}
