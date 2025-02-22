import { CertificacionModel, TipoRedeterminacionModel } from '.'
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
  numeroExpedienteCertificado: string
  numeroExpedienteSolicitud: string
  monto: number
  nuevoMontoObra: number
  fecha: string
  observaciones: string

  certificacion?: CertificacionModel.RawRef
  tipoRedeterminacion?: TipoRedeterminacionModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  numeroExpediente: string
  numeroResolucion: string
  numeroExpedienteCertificado: string
  numeroExpedienteSolicitud: string
  monto: number
  nuevoMontoObra: number
  fecha: string
  observaciones: string

  certificacion?: CertificacionModel.Ref
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
  numeroExpedienteCertificado: string
  numeroExpedienteSolicitud: string
  monto: number
  nuevoMontoObra: number
  fecha: string
  observaciones: string

  certificacionId: number
  tipoRedeterminacionId: number
}

export interface CreateBody {
  numeroExpediente: string
  numeroResolucion: string
  numeroExpedienteCertificado: string
  numeroExpedienteSolicitud: string
  monto: number
  nuevoMontoObra: number
  fecha: string
  observaciones: string

  certificacionId: number
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
  refAnchorField: 'Nombre',

  groups: [
    {
      props: {
        numeroExpediente: new TextProp('Número De Expediente', {
          field: {
            required: true,
          },
        }),
        numeroResolucion: new TextProp('Número De Resolución', {
          field: {
            required: true,
          },
        }),
        numeroExpedienteCertificado: new TextProp(
          'Número De Expediente Certificado',
          {
            field: {
              required: true,
            },
          },
        ),
        numeroExpedienteSolicitud: new TextProp(
          'Número De Expediente Solicitud',
          {
            field: {
              required: true,
            },
          },
        ),

        monto: new NumberProp('Monto', {
          decimal: true,
          big: true,
          pre: '$',
          field: { required: true },
        }),

        nuevoMontoObra: new NumberProp('Nuevo Monto', {
          decimal: true,
          big: true,
          pre: '$',
          field: { required: true },
        }),

        fecha: new DateProp('Fecha', { field: { required: true } }),

        observaciones: new TextLongProp('Observaciones'),

        certificacion: new RefProp({
          getScheme: () => CertificacionModel.scheme,
        }),

        tipoRedeterminacion: new RefProp({
          getScheme: () => TipoRedeterminacionModel.scheme,
        }),

        ...COMMON_PROPS,
      },
    },
  ],
}
