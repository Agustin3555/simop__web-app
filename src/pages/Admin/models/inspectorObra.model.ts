import {
  ObraModel,
  InspectorModel,
  TipoInspectorModel,
  TipoProfesionModel,
} from '.'
import { RefProp, MetaModel, BooleanProp, DateProp } from '../services/config'
import { InspectorObraService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../constants/selectors.const'

export interface OwnFields {
  vigencia: boolean
  fecha: string
}

export interface RelationFields {
  obra: ObraModel.Ref
  inspector: InspectorModel.Ref
  tipoInspector: TipoInspectorModel.Ref
  tipoProfesion: TipoProfesionModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<
    'obraId' | 'inspectorId' | 'tipoInspectorId' | 'tipoProfesionId',
    number
  >

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'fecha'>

export const metaModel = new MetaModel<Entity>({
  key: 'inspectorObra',
  service: InspectorObraService,
  refreshRate: 'medium',
  title: {
    singular: 'Inspector de Obra',
    plural: 'Inspectores de Obra',
  },
  faIcon: 'fa-solid fa-',

  anchorField: 'id',
  props: {
    obra: new RefProp({
      getMetaModel: () => ObraModel.metaModel,
      field: {
        required: true,
      },
    }),
    inspector: new RefProp({
      getMetaModel: () => InspectorModel.metaModel,
      field: {
        required: true,
      },
    }),
    tipoInspector: new RefProp({
      getMetaModel: () => TipoInspectorModel.metaModel,
    }),
    tipoProfesion: new RefProp({
      getMetaModel: () => TipoProfesionModel.metaModel,
    }),
    vigencia: new BooleanProp('Vigencia', {
      falseText: 'No Vigente',
      trueText: 'Vigente',
    }),
    fecha: new DateProp('Fecha'),
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
