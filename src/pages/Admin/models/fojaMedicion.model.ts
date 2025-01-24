import { ObraModel, InspectorModel } from '.'
import { Ref } from '@/types'
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

  obraId?: ObraModel.RawRef
  inspectorId?: InspectorModel.RawRef

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

  obraId?: Ref
  inspectorId?: Ref

  creado: string
  modificado: string
}

export interface RawRef {
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
  title: {
    singular: 'Foja Medicion ',
    plural: 'Fojas de Mediciones',
  },
  refAnchorField: 'Nombre',

  groups: [
    {
      props: {
        numero: new NumberProp('numero', 'Número', {
          field: {
            required: true,
          },
        }),
        fecha: new DateProp('fecha', 'Fecha', {
          field: {
            required: true,
          },
        }),
        numeroExpediente: new TextProp(
          'numeroExpediente',
          'Numero de Expediente',
          {
            field: {
              required: true,
            },
          },
        ),
        observaciones: new TextLongProp('observaciones', 'Observaciones', {
          field: {
            required: true,
          },
        }),
        avance: new NumberProp('avance', 'Monto', {
          decimal: true,
          pre: '%',
        }),

        obraId: new RefProp('obraId', {
          getScheme: () => ObraModel.scheme,
          field: {
            required: true,
          },
        }),
        inspectorId: new RefProp('inspectorId', {
          getScheme: () => InspectorModel.scheme,
          field: {
            required: true,
          },
        }),
        ...COMMON_PROPS,
      },
    },
  ],
}
