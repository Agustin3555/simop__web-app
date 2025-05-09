import { ProvinciaModel } from '.'
import { RefProp, MetaModel, TextProp } from '../services/config'
import { LocalidadService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'

export interface OwnFields {
  nombre: string
}

export interface RelationFields {
  provincia: ProvinciaModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields & Record<'provinciaId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'nombre'>

export const scheme = new MetaModel<Entity>({
  key: 'localidad',
  service: LocalidadService,
  refreshRate: 'low',
  title: {
    singular: 'Localidad',
    plural: 'Localidades',
  },

  anchorField: 'nombre',
  props: {
    nombre: new TextProp('Nombre', {
      field: {
        required: true,
      },
    }),
    provincia: new RefProp({
      getScheme: () => ProvinciaModel.scheme,
      field: {
        required: true,
      },
    }),
    ...COMMON_PROPS,
  },
})
