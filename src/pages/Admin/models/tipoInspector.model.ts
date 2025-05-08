import { TIPO_PROPS } from '../constants/commonProps.const'
import { TipoInspectorService } from '../services'
import { Scheme } from '../services/config'
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
  key: 'tipoInspector',
  service: TipoInspectorService,
  title: {
    singular: 'Tipo de Inspector',
    plural: 'Tipos de Inspectores',
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
