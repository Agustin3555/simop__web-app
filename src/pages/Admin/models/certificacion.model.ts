import { FojaMedicionModel } from '.'
import { Ref } from '@/types'
import { CertificacionService } from '../services'
import {
  NumberProp,
  RefProp,
  Scheme,
  DateProp,
  TextLongProp,
} from '../services/config'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  ordenPago: number
  fecha: string
  monto: number
  observaciones: string

  fojaMedicion?: FojaMedicionModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  ordenPago: number
  fecha: string
  monto: number
  observaciones: string

  fojaMedicion?: Ref

  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  ordenPago: string
}

export interface CreateData {
  id: number
  ordenPago: number
  fecha: string
  monto: number
  observaciones: string

  fojaMedicionId: number
}

export interface CreateBody {
  id: number
  ordenPago: number
  fecha: string
  monto: number
  observaciones: string

  fojaMedicionId: number
}

export const scheme: Scheme<Entity> = {
  key: 'certificacion',
  service: CertificacionService,
  title: {
    singular: 'Certificacion',
    plural: 'Certificaciones',
  },
  refAnchorField: 'Nombre',

  groups: [
    {
      props: {
        ordenPago: new NumberProp('ordenPago', 'Número de Expediente', {
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
          pre: '$',
        }),

        fojaMedicion: new RefProp('fojaMedicion', {
          getScheme: () => FojaMedicionModel.scheme,
          field: {
            required: true,
          },
        }),
        observaciones: new TextLongProp('observaciones', 'Observaciones'),
        ...COMMON_PROPS,
      },
    },
  ],
}
