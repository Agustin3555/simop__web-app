import { Scheme } from '../services/config'
import { TipoRecepcionService } from '../services'
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

export const scheme: Scheme<Entity> = {
  key: 'tipoRecepcion',
  service: TipoRecepcionService,
  title: {
    singular: 'Tipo Recepción',
    plural: 'Tipos de Recepción',
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
