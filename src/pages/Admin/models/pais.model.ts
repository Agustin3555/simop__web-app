import { MetaModel, TextProp } from '../services/config'
import { PaisService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  nombre: string

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  nombre: string

  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  nombre: string
}

export interface Ref {
  id: number

  nombre: string
}

export interface CreateEntity {
  nombre: string
}

export interface CreateBody {
  nombre: string
}
export type UpdateEntity = Partial<CreateEntity>

export type UpdateBody = Partial<CreateBody>

export const scheme: MetaModel<Entity> = {
  key: 'pais',
  service: PaisService,
  title: {
    singular: 'País',
    plural: 'Países',
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
        ...COMMON_PROPS,
      },
    },
  ],
}
