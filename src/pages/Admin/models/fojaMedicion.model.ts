import { ObraModel, InspectorModel, DireccionModel, DepartamentoModel } from '.'
import {
  NumberProp,
  RefProp,
  MetaModel,
  TextProp,
  TextLongProp,
  DateProp,
} from '../services/config'
import { FojaMedicionService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  numero: number
  numeroExpediente: string
  avance?: number
  fechaFoja?: string
  observaciones?: string
  fechaCertificacion?: string
  montoTotal?: number

  direccion?: DireccionModel.RawRef
  departamento?: DepartamentoModel.RawRef
  obra?: ObraModel.RawRef
  inspector?: InspectorModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  numero: number
  numeroExpediente: string
  avance?: number
  fechaFoja?: string
  observaciones?: string
  fechaCertificacion?: string
  montoTotal?: number

  direccion?: DireccionModel.Ref
  departamento?: DepartamentoModel.Ref
  obra?: ObraModel.Ref
  inspector?: InspectorModel.Ref

  creado: string
  modificado: string
}

export interface RawRef {
  id: number

  numero: number
  numeroExpediente: string
}

export interface Ref {
  id: number

  numero: number
  numeroExpediente: string
}

export interface CreateEntity {
  numero: number
  numeroExpediente: string
  avance: number
  fechaFoja: string
  observaciones: string
  fechaCertificacion: string
  montoTotal: number
  direccionId?: number
  departamentoId?: number
  obraId?: number
  inspectorId?: number
}

export interface CreateBody {
  numero: number
  numeroExpediente: string
  avance: number
  fechaFoja: string
  observaciones: string
  fechaCertificacion: string
  montoTotal: number
  direccionId?: number
  departamentoId?: number
  obraId?: number
  inspectorId?: number
}

export type UpdateEntity = Partial<CreateEntity>

export type UpdateBody = Partial<CreateBody>

export const scheme: MetaModel<Entity> = {
  key: 'fojaMedicion',
  service: FojaMedicionService,
  refreshRate: 'medium',
  title: {
    singular: 'Foja de Medición',
    plural: 'Fojas de Mediciones',
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
        numeroExpediente: new TextProp('Numero de Expediente de Foja', {
          field: {
            required: true,
          },
        }),
        numero: new NumberProp('Número de foja', {
          field: {
            required: true,
          },
        }),
        avance: new NumberProp('Porcentaje de avance', {
          decimal: true,
          sub: '%',
        }),
        fechaFoja: new DateProp('Fecha de Solicitud'),

        fechaCertificacion: new DateProp('Fecha Certificación'),

        montoTotal: new NumberProp('Monto Total', {
          decimal: true,
          isMoney: true,
          big: true,
          sum: true,
          pre: '$',
        }),

        inspector: new RefProp({
          getScheme: () => InspectorModel.scheme,
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
