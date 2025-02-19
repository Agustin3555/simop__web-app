import { Scheme, TextProp } from '../services/config'
import { SubSecretariaService } from '../services'
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

export interface CreateData {
  nombre: string
}

export interface CreateBody {
  nombre: string
}

export const scheme: Scheme<Entity> = {
  key: 'subSecretaria',
  service: SubSecretariaService,
  title: {
    singular: 'Subsecretaría',
    plural: 'Subsecretarías',
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
