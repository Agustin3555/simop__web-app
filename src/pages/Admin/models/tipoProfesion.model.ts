import { MetaModel } from '../services/config'
import { TipoProfesionService } from '../services'
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
  key: 'tipoProfesion',
  service: TipoProfesionService,
  title: {
    singular: 'Tipo de Profesión',
    plural: 'Tipos de Profesiones',
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
