import {
  FojaMedicionModel,
  RedeterminacionModel,
  DireccionModel,
  DepartamentoModel,
} from '.'
import { COMMON_PROPS } from '../constants/commonProps.const'
import {
  MetaModel,
  NumberProp,
  RefProp,
  DateProp,
  TextLongProp,
  TextProp,
} from '../services/config'
import { PagoCertificacionService } from '../services'
import { BaseEntity, BaseRef } from '@/models/config'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../constants/selectors.const'

export interface OwnFields {
  numero: number
  ordenPago: string
  monto: number
  fecha: string
  observaciones: string
}

export interface RelationFields {
  direccion: DireccionModel.Ref
  departamento: DepartamentoModel.Ref
  redeterminacion: RedeterminacionModel.Ref
  fojaMedicion: FojaMedicionModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<
    'direccionId' | 'departamentoId' | 'redeterminacionId' | 'ojaMedicionId',
    number
  >

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'numero'>

export const metaModel = new MetaModel<Entity>({
  key: 'pagoCertificacion',
  service: PagoCertificacionService,
  refreshRate: 'medium',
  title: {
    singular: 'Pago de Certificación',
    plural: 'Pagos de Certificación',
  },
  faIcon: 'fa-solid fa-',

  anchorField: 'numero',
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
      getMetaModel: () => FojaMedicionModel.metaModel,
    }),
    redeterminacion: new RefProp({
      getMetaModel: () => RedeterminacionModel.metaModel,
    }),
    direccion: new RefProp({
      getMetaModel: () => DireccionModel.metaModel,
    }),
    departamento: new RefProp({
      getMetaModel: () => DepartamentoModel.metaModel,
    }),
    observaciones: new TextLongProp('Observaciones'),
    ...COMMON_PROPS,
  },
})

metaModel.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: metaModel.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(metaModel.allFields) }],
  },
]
