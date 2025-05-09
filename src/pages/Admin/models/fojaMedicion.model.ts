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
import { BaseEntity, BaseRef } from '@/models/config'

export interface OwnFields {
  numero: number
  numeroExpediente: string
  avance: number
  fechaFoja: string
  observaciones: string
  fechaCertificacion: string
  montoTotal: number
}

export interface RelationFields {
  direccion: DireccionModel.Ref
  departamento: DepartamentoModel.Ref
  obra: ObraModel.Ref
  inspector: InspectorModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<'direccionId' | 'departamentoId' | 'obraId' | 'inspectorId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'numero' | 'numeroExpediente'>

export const scheme = new MetaModel<Entity>({
  key: 'fojaMedicion',
  service: FojaMedicionService,
  refreshRate: 'medium',
  title: {
    singular: 'Foja de Medición',
    plural: 'Fojas de Mediciones',
  },

  anchorField: 'numeroExpediente',
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
})
