import { TipoProfesionModel } from '.'
import {
  NumberProp,
  RefListProp,
  MetaModel,
  TextProp,
} from '../services/config'
import { InspectorService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'

export interface OwnFields {
  cuil: number
  apellido: string
  nombre: string
}

interface RelationFields {
  profesiones: TipoProfesionModel.Ref[]
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields & { profesiones: number[] }

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'cuil' | 'apellido' | 'nombre'>

export const scheme: MetaModel<Entity> = {
  key: 'inspector',
  service: InspectorService,
  refreshRate: 'low',
  title: {
    singular: 'Inspector',
    plural: 'Inspectores',
  },
  anchorField: 'apellido',

  groups: [
    {
      props: {
        cuil: new NumberProp('CUIL', {
          big: true,
          field: {
            required: true,
          },
        }),
        apellido: new TextProp('Apellido', {
          field: {
            required: true,
          },
        }),
        nombre: new TextProp('Nombre'),
        profesiones: new RefListProp({
          getScheme: () => TipoProfesionModel.scheme,
        }),
        ...COMMON_PROPS,
      },
    },
  ],
}
