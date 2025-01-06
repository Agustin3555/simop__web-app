import { Ref } from '@/types'
import { SubSecretariaModel } from '.'
import { RefProp, Scheme, TextProp } from '../services/config'
import { DireccionService } from '../services'
import { COMMON_PROPS } from '../constants'

export interface RawEntity {
  id: number
  nombre: string

  subSecretaria?: SubSecretariaModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  nombre: string

  subSecretaria?: Ref

  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  nombre: string
}

export interface CreateData {
  nombre: string

  subSecretariaId: number
}

export interface CreateBody {
  nombre: string

  subSecretariaId: number
}

export const scheme: Scheme<Entity> = {
  key: 'direccion',
  service: DireccionService,
  title: {
    singular: 'Dirección',
    plural: 'Direcciones',
  },

  groups: [
    {
      props: {
        ...COMMON_PROPS,
        nombre: new TextProp('nombre', 'Nombre', {
          field: {
            required: true,
          },
        }),
        subSecretaria: new RefProp('subSecretaria', {
          getScheme: () => SubSecretariaModel.scheme,
        }),
      },
    },
  ],
}
