import { ObraModel, TipoRedeterminacionModel } from '.'
import {
  DateProp,
  NumberProp,
  TextLongProp,
  RefProp,
  Scheme,
  TextProp,
} from '../services/config'
import { RedeterminacionService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  numeroExpediente: string
  numeroResolucion: string
  numeroExpedienteSolicitud: string
  monto: number
  nuevoMontoObra: number
  fecha: string
  observaciones: string

  obra?: ObraModel.RawRef
  tipoRedeterminacion?: TipoRedeterminacionModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  numeroExpediente: string
  numeroResolucion: string
  numeroExpedienteSolicitud: string
  monto: number
  nuevoMontoObra: number
  fecha: string
  observaciones: string

  obra?: ObraModel.Ref
  tipoRedeterminacion?: TipoRedeterminacionModel.Ref

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
  numeroResolucion: string
  numeroExpedienteSolicitud: string
  monto: number
  nuevoMontoObra: number
  fecha: string
  observaciones: string

  obraId: number
  tipoRedeterminacionId: number
}

export interface CreateBody {
  numeroExpediente: string
  numeroResolucion: string
  numeroExpedienteSolicitud: string
  monto: number
  nuevoMontoObra: number
  fecha: string
  observaciones: string

  obraId: number
  tipoRedeterminacionId: number
}

export const scheme: Scheme<Entity> = {
  key: 'redeterminacion',
  service: RedeterminacionService,
  refreshRate: 'medium',
  title: {
    singular: 'Redeterminación',
    plural: 'Redeterminaciones',
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
        numeroExpediente: new TextProp('Número De Expediente', {
          field: {
            required: true,
          },
        }),
        numeroResolucion: new TextProp('Número De Resolución'),
        numeroExpedienteSolicitud: new TextProp(
          'Número De Expediente de la Solicitud',
        ),
        monto: new NumberProp('Monto', {
          decimal: true,
          big: true,
          pre: '$',
        }),
        nuevoMontoObra: new NumberProp('Nuevo Monto', {
          decimal: true,
          big: true,
          pre: '$',
        }),
        fecha: new DateProp('Fecha'),
        tipoRedeterminacion: new RefProp({
          getScheme: () => TipoRedeterminacionModel.scheme,
        }),
        observaciones: new TextLongProp('Observaciones'),
        ...COMMON_PROPS,
      },
    },
  ],
}
