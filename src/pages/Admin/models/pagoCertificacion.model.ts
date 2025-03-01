import { CertificacionModel } from '.'
import { COMMON_PROPS } from '../constants/commonProps.const'
import {
  Scheme,
  NumberProp,
  RefProp,
  DateProp,
  TextLongProp,
  TextProp,
} from '../services/config'
import { PagoCertificacionService } from '../services'

export interface RawEntity {
  id: number
  numero: number
  ordenPago?: string
  monto: number
  fecha: string
  observaciones: string

  certificacion?: CertificacionModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  numero: number
  ordenPago?: string
  monto: number
  fecha: string
  observaciones: string

  certificacion?: CertificacionModel.Ref

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
  ordenPago?: string
  fecha: string
  observaciones: string
  monto: number

  certificacionId?: number
}

export interface CreateBody {
  numero: number
  ordenPago?: string
  fecha: string
  observaciones: string
  monto: number

  certificacionId?: number
}

export const scheme: Scheme<Entity> = {
  key: 'pagoCertificacion',
  service: PagoCertificacionService,
  refreshRate: 'medium',
  title: {
    singular: 'Pago de Certificación',
    plural: 'Pagos de Certificación',
  },
  anchorField: 'numero',

  groups: [
    {
      props: {
        numero: new NumberProp('Número de pago', {
          field: {
            required: true,
          },
        }),
        ordenPago: new TextProp('Orden de pago'),
        fecha: new DateProp('Fecha'),
        monto: new NumberProp('Monto', {
          decimal: true,
          big: true,
          pre: '$',
        }),
        certificacion: new RefProp({
          getScheme: () => CertificacionModel.scheme,
        }),
        observaciones: new TextLongProp('Observaciones'),
        ...COMMON_PROPS,
      },
    },
  ],
}
