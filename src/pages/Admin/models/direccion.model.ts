import { SubSecretariaModel } from '.'
import { RefProp, MetaModel, TextProp } from '../services/config'
import { DireccionService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../constants/selectors.const'

export interface OwnFields {
  nombre: string
}

export interface RelationFields {
  subSecretaria: SubSecretariaModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields & Record<'subsecretariaId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'nombre'>

export const metaModel = new MetaModel<Entity>({
  key: 'direccion',
  service: DireccionService,
  title: {
    singular: 'Dirección',
    plural: 'Direcciones',
  },

  anchorField: 'nombre',
  props: {
    nombre: new TextProp('Nombre', {
      field: {
        required: true,
      },
    }),
    subSecretaria: new RefProp({
      getMetaModel: () => SubSecretariaModel.metaModel,
      field: {
        required: true,
      },
    }),
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
