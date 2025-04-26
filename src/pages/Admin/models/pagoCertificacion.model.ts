import {
  FojaMedicionModel,
  RedeterminacionModel,
  DireccionModel,
  DepartamentoModel,
} from '.'
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
  monto?: number
  fecha?: string
  observaciones?: string

  direccion?: DireccionModel.RawRef
  departamento?: DepartamentoModel.RawRef
  redeterminacion?: RedeterminacionModel.RawRef
  fojaMedicion?: FojaMedicionModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  numero: number
  ordenPago?: string
  monto?: number
  fecha?: string
  observaciones?: string

  direccion?: DireccionModel.Ref
  departamento?: DepartamentoModel.Ref
  redeterminacion?: RedeterminacionModel.Ref
  fojaMedicion?: FojaMedicionModel.Ref

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
  fecha?: string
  observaciones?: string
  monto?: number

  direccionId?: number
  departamentoId?: number
  redeterminacionId?: number
  fojaMedicionId?: number
}

export interface CreateBody {
  numero: number
  ordenPago?: string
  fecha?: string
  observaciones?: string
  monto?: number

  redeterminacionId?: number
  fojaMedicionId?: number
}

export type UpdateData = Partial<CreateData>

export type UpdateBody = Partial<CreateBody>

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
        numero: new NumberProp('Número de Pago', {
          field: {
            required: true,
          },
        }),
        ordenPago: new TextProp('Orden de pago', {
          field: {
            required: true,
          },
        }),
        fecha: new DateProp('Fecha de Pago'),
        monto: new NumberProp('Monto', {
          decimal: true,
          isMoney: true,
          big: true,
          sum: true,
          pre: '$',
        }),
        fojaMedicion: new RefProp({
          getScheme: () => FojaMedicionModel.scheme,
        }),
        redeterminacion: new RefProp({
          getScheme: () => RedeterminacionModel.scheme,
        }),
        direccion: new RefProp({
          getScheme: () => DireccionModel.scheme,
        }),
        departamento: new RefProp({
          getScheme: () => DepartamentoModel.scheme,
        }),
        observaciones: new TextLongProp('Observaciones'),
        ...COMMON_PROPS,
      },
    },
  ],
}
