import { SubSecretariaModel } from '.'
import { RefProp, Scheme, TextProp } from '../services/config'
import { DireccionService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'

export interface OwnFields {
  nombre: string
}

export interface RelationFields {
  subSecretaria: SubSecretariaModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields & Record<'subsecretariaId', number>

export type Ref = BaseRef<OwnFields, 'nombre'>

export type UpdateEntity = Partial<CreateEntity>

export const scheme: Scheme<Entity> = {
  key: 'direccion',
  service: DireccionService,
  title: {
    singular: 'Dirección',
    plural: 'Direcciones',
  },
  anchorField: 'nombre',

  groups: [
    {
      props: {
        nombre: new TextProp('Nombre', {
          field: {
            required: true,
          },
        }),
        subSecretaria: new RefProp({
          getScheme: () => SubSecretariaModel.scheme,
          field: {
            required: true,
          },
        }),
        ...COMMON_PROPS,
      },
    },
  ],
}
