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

  pais?: PaisModel.Ref

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

  paisId: number
}

export interface CreateBody {
  nombre: string

  paisId: number
}
export interface UpdateData {
  nombre?: string

  paisId?: number
}

export interface UpdateBody {
  nombre?: string

  paisId?: number
}

export const scheme: Scheme<Entity> = {
  key: 'provincia',
  service: ProvinciaService,
  refreshRate: 'low',
  title: {
    singular: 'Provincia',
    plural: 'Provincias',
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
        pais: new RefProp({
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
