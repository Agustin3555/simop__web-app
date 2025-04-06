import {
  ObraModel,
  TipoRedeterminacionModel,
  DireccionModel,
  DepartamentoModel,
  RedeterminacionModel,
} from '.'
import {
  DateProp,
  NumberProp,
  TextLongProp,
  RefProp,
  Scheme,
  TextProp,
  BooleanProp,
} from '../services/config'
import { RedeterminacionService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  numeroExpedienteSolicitud: string
  numeroExpediente?: string
  numeroResolucion?: string
  montoTotal?: number
  nuevoMontoObra?: number
  fechaRedeterminacion?: string
  observaciones?: string
  fechaCertificacion?: string
  tieneHijas: boolean

  redeterminacion: RawRef
  direccion?: DireccionModel.RawRef
  departamento?: DepartamentoModel.RawRef
  obra?: ObraModel.RawRef
  tipoRedeterminacion?: TipoRedeterminacionModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  numeroExpedienteSolicitud: string
  numeroExpediente?: string
  numeroResolucion?: string
  montoTotal?: number
  nuevoMontoObra?: number
  fechaRedeterminacion?: string
  observaciones?: string
  fechaCertificacion?: string
  tieneHijas: boolean

  redeterminacion: Ref
  direccion?: DireccionModel.Ref
  departamento?: DepartamentoModel.Ref
  obra?: ObraModel.Ref
  tipoRedeterminacion?: TipoRedeterminacionModel.Ref

  creado: string
  modificado: string
}

export interface RawRef {
  id: number

  numeroExpedienteSolicitud: string
}

export interface Ref {
  id: number

  numeroExpedienteSolicitud: string
}

export interface CreateData {
  numeroExpediente: string
  numeroResolucion: string
  numeroExpedienteSolicitud: string
  montoTotal: number
  nuevoMontoObra: number
  fechaRedeterminacion: string
  observaciones: string
  fechaCertificacion: string
  tieneHijas: boolean

  redeterminacionId?: number
  direccionId?: number
  departamentoId?: number
  obraId: number
  tipoRedeterminacionId: number
}

export interface CreateBody {
  numeroExpedienteSolicitud: string
  numeroExpediente: string
  numeroResolucion: string
  montoTotal: number
  nuevoMontoObra: number
  fechaRedeterminacion: string
  observaciones: string
  fechaCertificacion: string
  tieneHijas: boolean

  redeterminacionId?: number
  direccionId?: number
  departamentoId?: number
  obraId: number
  tipoRedeterminacionId: number
}

export interface UpdateData {
  numeroExpedienteSolicitud?: string
  numeroExpediente?: string
  numeroResolucion?: string
  montoTotal?: number
  nuevoMontoObra?: number
  fechaRedeterminacion?: string
  observaciones?: string
  fechaCertificacion?: string
  tieneHijas?: boolean

  redeterminacionId?: number
  direccionId?: number
  departamentoId?: number
  obraId?: number
  tipoRedeterminacionId?: number
}

export interface UpdateBody {
  numeroExpedienteSolicitud?: string
  numeroExpediente?: string
  numeroResolucion?: string
  montoTotal?: number
  nuevoMontoObra?: number
  fechaRedeterminacion?: string
  observaciones?: string
  fechaCertificacion?: string
  tieneHijas?: boolean

  redeterminacionId?: number
  direccionId?: number
  departamentoId?: number
  obraId?: number
  tipoRedeterminacionId?: number
}

export const scheme: Scheme<Entity> = {
  key: 'redeterminacion',
  service: RedeterminacionService,
  refreshRate: 'medium',
  title: {
    singular: 'Redeterminación',
    plural: 'Redeterminaciones',
  },
  anchorField: 'numeroExpedienteSolicitud',

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
          {
            field: {
              required: true,
            },
          },
        ),
        montoTotal: new NumberProp('Monto Total', {
          decimal: true,
          isMoney: true,
          big: true,
          sum: true,
          pre: '$',
        }),
        nuevoMontoObra: new NumberProp('Nuevo Monto', {
          decimal: true,
          isMoney: true,
          big: true,
          sum: true,
          pre: '$',
        }),
        fechaRedeterminacion: new DateProp('Fecha'),
        fechaCertificacion: new DateProp('Fecha Certificación'),
        tieneHijas: new BooleanProp('Tiene Hijas'),
        tipoRedeterminacion: new RefProp({
          getScheme: () => TipoRedeterminacionModel.scheme,
        }),
        direccion: new RefProp({
          getScheme: () => DireccionModel.scheme,
        }),
        departamento: new RefProp({
          getScheme: () => DepartamentoModel.scheme,
        }),
        redeterminacion: new RefProp({
          getScheme: () => RedeterminacionModel.scheme,
        }),
        observaciones: new TextLongProp('Observaciones'),
        ...COMMON_PROPS,
      },
    },
  ],
}
