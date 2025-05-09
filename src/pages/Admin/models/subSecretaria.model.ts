import { MetaModel, TextProp } from '../services/config'
import { SubSecretariaService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'

export interface OwnFields {
  nombre: string
}

export interface RelationFields {}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'nombre'>

export const scheme = new MetaModel<Entity>({
  key: 'subSecretaria',
  service: SubSecretariaService,
  title: {
    singular: 'Subsecretaría',
    plural: 'Subsecretarías',
  },

  anchorField: 'nombre',
  props: {
    nombre: new TextProp('Nombre', {
      field: {
        required: true,
      },
    }),
    ...COMMON_PROPS,
  },
})
