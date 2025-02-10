import { CertificacionModel } from '.'
import { Ref } from '@/types'
import { COMMON_PROPS } from '../constants/commonProps.const'
import {
  Scheme,
  NumberProp,
  RefProp,
  DateProp,
  TextLongProp,
} from '../services/config'
import { PagoCertificacionService } from '../services'

export interface RawEntity {
  id: number
  numero: number
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
  monto: number
  fecha: string
  observaciones: string

  certificacion?: Ref

  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  numero: number
}

export interface CreateData {
  numero: number
  fecha: string
  observaciones: string
  monto: number

  certificacionId?: number
}

export interface CreateBody {
  numero: number
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
  refAnchorField: 'Nombre',

  groups: [
    {
      props: {
        numero: new NumberProp('numero', 'Número de pago', {
          field: {
            required: true,
          },
        }),
        fecha: new DateProp('fecha', 'Fecha', {
          field: {
            required: true,
          },
        }),
        monto: new NumberProp('monto', 'Monto', {
          decimal: true,
          big: true,
          pre: '$',
        }),

        certificacion: new RefProp('certificacion', {
          getScheme: () => CertificacionModel.scheme,
          field: {
            required: true,
          },
        }),
        observaciones: new TextLongProp('observaciones', 'Observaciones', {
          field: {
            required: true,
          },
        }),
        ...COMMON_PROPS,
      },
    },
  ],
}
