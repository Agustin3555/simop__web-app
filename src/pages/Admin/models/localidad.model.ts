import { Ref } from '@/types'
import { ProvinciaModel } from '.'
import { RefProp, Scheme, TextProp } from '../services/config'
import { LocalidadService } from '../services'
import { COMMON_PROPS } from '../constants'

export interface RawEntity {
  id: number
  nombre: string

  provincia?: ProvinciaModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  nombre: string

  provincia?: Ref

  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  nombre: string
}

export interface CreateData {
  nombre: string

  provinciaId: number
}

export interface CreateBody {
  nombre: string

  provinciaId: number
}

export const scheme: Scheme<Entity> = {
  key: 'localidad',
  service: LocalidadService,
  title: {
    singular: 'Localidad',
    plural: 'Localidades',
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
        provincia: new RefProp('provincia', {
          getScheme: () => ProvinciaModel.scheme,
        }),
      },
    },
  ],
}
