import { MetaModel } from '../services/config'
import { TipoTematicaObraService } from '../services'
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

export const scheme = new MetaModel<Entity>({
  key: 'tipoTematicaObra',
  service: TipoTematicaObraService,
  title: {
    singular: 'Tipo de Temática de Obra',
    plural: 'Tipos de Temáticas de Obra',
  },

  anchorField: 'nombre',
  props: {
    ...TIPO_PROPS,
  },
})
