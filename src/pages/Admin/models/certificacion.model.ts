import { FojaMedicionModel } from '.'
import { CertificacionService } from '../services'
import {
  NumberProp,
  RefProp,
  Scheme,
  DateProp,
  TextLongProp,
  TextProp,
} from '../services/config'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  numeroExpediente: string
  fecha?: string
  monto?: number
  observaciones?: string

  fojaMedicion?: FojaMedicionModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  numeroExpediente: string
  fecha?: string
  monto?: number
  observaciones?: string

  fojaMedicion?: FojaMedicionModel.Ref

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
  fecha: string
  monto: number
  observaciones: string

  fojaMedicionId: number
}

export interface CreateBody {
  numeroExpediente: string
  fecha: string
  monto: number
  observaciones: string

  fojaMedicionId: number
}

export interface UpdateData {
  numeroExpediente?: string
  fecha?: string
  monto?: number
  observaciones?: string

  fojaMedicionId?: number
}

export interface UpdateBody {
  numeroExpediente?: string
  fecha?: string
  monto?: number
  observaciones?: string

  fojaMedicionId?: number
}

export const scheme: Scheme<Entity> = {
  key: 'certificacion',
  service: CertificacionService,
  refreshRate: 'medium',
  title: {
    singular: 'Certificación',
    plural: 'Certificaciones',
  },
  anchorField: 'numeroExpediente',

  groups: [
    {
      props: {
        numeroExpediente: new TextProp('Número de Expediente', {
          field: {
            required: true,
          },
        }),
        fecha: new DateProp('Fecha'),
        monto: new NumberProp('Monto', {
          decimal: true,
          isMoney: true,
          sum: true,
          pre: '$',
        }),

        fojaMedicion: new RefProp({
          getScheme: () => FojaMedicionModel.scheme,
        }),
        observaciones: new TextLongProp('Observaciones'),
        ...COMMON_PROPS,
      },
    },
  ],
}
