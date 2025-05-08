import { MetaModel } from '../services/config'
import { TipoProgramaObraService } from '../services'
import { TIPO_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'

export interface OwnFields {
  nombre: string
}

export interface RelationFields {}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'nombre'>

export const scheme: MetaModel<Entity> = {
  key: 'tipoProgramaObra',
  service: TipoProgramaObraService,
  title: {
    singular: 'Obra Inaugurada',
    plural: 'Obra Inaugurada',
  },
  anchorField: 'nombre',

  groups: [
    {
      props: {
        ...TIPO_PROPS,
      },
    },
  ],
}
