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

  certificacionId?: CertificacionModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  numero: number
  monto: number
  fecha: string
  observaciones: string

  certificacionId?: Ref

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
  title: {
    singular: 'Pago Certificación',
    plural: 'Pagos Certificaciones',
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
        observaciones: new TextLongProp('observaciones', 'Observaciones', {
          field: {
            required: true,
          },
        }),
        monto: new NumberProp('monto', 'Monto', {
          decimal: true,
          pre: '$',
        }),

        certificacionId: new RefProp('certificacionId', {
          getScheme: () => CertificacionModel.scheme,
          field: {
            required: true,
          },
        }),
        ...COMMON_PROPS,
      },
    },
  ],
}
