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
  MetaModel,
  TextProp,
  BooleanProp,
  RefListProp,
} from '../services/config'
import { RedeterminacionService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../constants/selectors.const'

export interface OwnFields {
  numeroExpedienteSolicitud: string
  numeroExpediente: string
  numeroResolucion: string
  montoTotal: number
  nuevoMontoObra: number
  fechaRedeterminacion: string
  observaciones: string
  fechaCertificacion: string
  tieneHijas: boolean
}

export interface RelationFields {
  redeterminacionesHijas: Ref[]
  direccion: DireccionModel.Ref
  departamento: DepartamentoModel.Ref
  obra: ObraModel.Ref
  tipoRedeterminacion: TipoRedeterminacionModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields & {
  redeterminacionesHijas: number[]
} & Record<
    'direccionId' | 'departamentoId' | 'obraId' | 'tipoRedeterminacionId',
    number
  >

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'numeroExpediente'>

export const metaModel = new MetaModel<Entity>({
  key: 'redeterminacion',
  service: RedeterminacionService,
  refreshRate: 'medium',
  title: {
    singular: 'Redeterminación',
    plural: 'Redeterminaciones',
  },
  faIcon: 'fa-solid fa-',

  anchorField: 'numeroExpedienteSolicitud',
  props: {
    obra: new RefProp({
      getMetaModel: () => ObraModel.metaModel,
      field: {
        required: true,
      },
    }),
    numeroExpediente: new TextProp('Número De Expediente de Redeterminación', {
      field: {
        required: true,
      },
    }),
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
      getMetaModel: () => TipoRedeterminacionModel.metaModel,
    }),
    direccion: new RefProp({
      getMetaModel: () => DireccionModel.metaModel,
    }),
    departamento: new RefProp({
      getMetaModel: () => DepartamentoModel.metaModel,
    }),
    redeterminacionesHijas: new RefListProp({
      getMetaModel: () => RedeterminacionModel.metaModel,
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
