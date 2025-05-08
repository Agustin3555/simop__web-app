import { DireccionModel } from '.'
import { RefProp, MetaModel, TextProp } from '../services/config'
import { DepartamentoService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'

export interface OwnFields {
  nombre: string
}

export interface RelationFields {
  direccion: DireccionModel.Ref
}

export interface RawRef {
  nombre: string
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields & Record<'direccionId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'nombre'>

export const scheme: MetaModel<Entity> = {
  key: 'departamento',
  service: DepartamentoService,
  title: {
    singular: 'Departamento',
    plural: 'Departamentos',
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
        direccion: new RefProp({
          getScheme: () => DireccionModel.scheme,
          field: {
            required: true,
          },
        }),
        ...COMMON_PROPS,
      },
    },
  ],
}
