import { SubSecretariaModel } from '.'
import { RefProp, Scheme, TextProp } from '../services/config'
import { DireccionService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

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

  subSecretaria?: SubSecretariaModel.Ref

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

  subSecretariaId: number
}

export interface CreateBody {
  nombre: string

  subSecretariaId: number
}

export type UpdateEntity = Partial<CreateEntity>

export type UpdateBody = Partial<CreateBody>

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
