import { Scheme } from '../services/config'
import { TipoContratacionObraService } from '../services'
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
  key: 'tipoContratacionObra',
  service: TipoContratacionObraService,
  title: {
    singular: 'Tipo de Contratación de Obra',
    plural: 'Tipos de Contrataciones de Obra',
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
