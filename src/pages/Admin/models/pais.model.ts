import { Scheme, TextProp } from '../services/config'
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

export interface CreateData {
  nombre: string
}

export interface CreateBody {
  nombre: string
}

export const scheme: Scheme<Entity> = {
  key: 'pais',
  service: PaisService,
  title: {
    singular: 'País',
    plural: 'Países',
  },
  refAnchorField: 'Nombre',

  groups: [
    {
      props: {
        nombre: new TextProp('nombre', 'Nombre', {
          field: {
            required: true,
          },
        }),
        ...COMMON_PROPS,
      },
    },
  ],
}
