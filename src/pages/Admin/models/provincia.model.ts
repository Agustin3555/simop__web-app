import { PaisModel } from '.'
import { RefProp, MetaModel, TextProp } from '../services/config'
import { ProvinciaService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'

export interface OwnFields {
  nombre: string
}

export interface RelationFields {
  pais: PaisModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields & Record<'paisId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'nombre'>

export const scheme = new MetaModel<Entity>({
  key: 'provincia',
  service: ProvinciaService,
  refreshRate: 'low',
  title: {
    singular: 'Provincia',
    plural: 'Provincias',
  },

  anchorField: 'nombre',
  props: {
    nombre: new TextProp('Nombre', {
      field: {
        required: true,
      },
    }),
    pais: new RefProp({
      getScheme: () => PaisModel.scheme,
      field: {
        required: true,
      },
    }),
    ...COMMON_PROPS,
  },
})
