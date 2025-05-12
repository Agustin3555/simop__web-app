import {
  ObraModel,
  TipoRescisionModel,
  DireccionModel,
  DepartamentoModel,
} from '.'
import {
  DateProp,
  TextLongProp,
  RefProp,
  MetaModel,
  TextProp,
} from '../services/config'
import { RescisionService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../constants/selectors.const'

export interface OwnFields {
  numeroExpediente: string
  numeroResolucion: string
  fecha: string
  observaciones: string
}

export interface RelationFields {
  direccion: DireccionModel.Ref
  departamento: DepartamentoModel.Ref
  obra: ObraModel.Ref
  tipoRescision: TipoRescisionModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<
    'direccionId' | 'departamentoId' | 'obraId' | ' tipoRescisionId',
    number
  >

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'numeroExpediente'>

export const metaModel = new MetaModel<Entity>({
  key: 'rescision',
  service: RescisionService,
  refreshRate: 'medium',
  title: {
    singular: 'Rescision',
    plural: 'Rescisiones',
  },

  anchorField: 'numeroExpediente',
  props: {
    obra: new RefProp({
      getMetaModel: () => ObraModel.metaModel,
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
    fecha: new DateProp('Fecha'),
    tipoRescision: new RefProp({
      getMetaModel: () => TipoRescisionModel.metaModel,
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
