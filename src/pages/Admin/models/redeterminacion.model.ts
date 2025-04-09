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
  RefListProp,
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

  redeterminacionesHijas: RawRef[]
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

  redeterminacionesHijas: Ref[]
  direccion?: DireccionModel.Ref
  departamento?: DepartamentoModel.Ref
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
        numeroExpediente: new TextProp(
          'Número De Expediente de Redeterminación',
          {
            field: {
              required: true,
            },
          },
        ),

        numeroResolucion: new TextProp('Número De Resolución'),

        numeroExpedienteSolicitud: new TextProp(
          'Número de Expediente de Solicitud',
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
        fechaRedeterminacion: new DateProp('Fecha de Solicitud'),
        fechaCertificacion: new DateProp('Fecha Certificación'),
        tieneHijas: new BooleanProp('AE Acum.'),
        tipoRedeterminacion: new RefProp({
          getScheme: () => TipoRedeterminacionModel.scheme,
        }),
        direccion: new RefProp({
          getScheme: () => DireccionModel.scheme,
        }),
        departamento: new RefProp({
          getScheme: () => DepartamentoModel.scheme,
        }),
        redeterminacionesHijas: new RefListProp({
          getScheme: () => RedeterminacionModel.scheme,
        }),
        observaciones: new TextLongProp('Observaciones'),
        ...COMMON_PROPS,
      },
    },
  ],
}
