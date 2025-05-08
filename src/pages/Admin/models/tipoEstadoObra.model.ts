import { TIPO_PROPS } from '../constants/commonProps.const'
import { TipoEstadoObraService } from '../services'
import { MetaModel } from '../services/config'
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
  key: 'tipoEstadoObra',
  service: TipoEstadoObraService,
  title: {
    singular: 'Tipo de Estado de Obra',
    plural: 'Tipos de Estados de Obra',
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
