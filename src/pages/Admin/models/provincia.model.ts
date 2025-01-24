import { Ref } from '@/types'
import { PaisModel } from '.'
import { RefProp, Scheme, TextProp } from '../services/config'
import { ProvinciaService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  nombre: string

  pais?: PaisModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  nombre: string

  pais?: Ref

  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  nombre: string
}

export interface CreateData {
  nombre: string

  paisId: number
}

export interface CreateBody {
  nombre: string

  paisId: number
}

export const scheme: Scheme<Entity> = {
  key: 'provincia',
  service: ProvinciaService,
  title: {
    singular: 'Provincia',
    plural: 'Provincias',
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
        pais: new RefProp('pais', {
          getScheme: () => PaisModel.scheme,
          field: {
            required: true,
          },
        }),
        ...COMMON_PROPS,
      },
    },
  ],
}
