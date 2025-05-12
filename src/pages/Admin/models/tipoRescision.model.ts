import { MetaModel } from '../services/config'
import { TipoRescisionService } from '../services'
import { TIPO_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../constants/selectors.const'

export interface OwnFields {
  nombre: string
}

export interface RelationFields {}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'nombre'>

export const metaModel = new MetaModel<Entity>({
  key: 'tipoRescision',
  service: TipoRescisionService,
  title: {
    singular: 'Tipo Rescisión',
    plural: 'Tipos de Rescisión',
  },

  anchorField: 'nombre',
  props: {
    ...TIPO_PROPS,
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
