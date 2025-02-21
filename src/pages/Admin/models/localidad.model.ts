import { ProvinciaModel } from '.'
import { RefProp, Scheme, TextProp } from '../services/config'
import { LocalidadService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

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

export interface Ref {
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
  refreshRate: 'low',
  title: {
    singular: 'Localidad',
    plural: 'Localidades',
  },
  refAnchorField: 'Nombre',

  groups: [
    {
      props: {
        nombre: new TextProp('Nombre', {
          field: {
            required: true,
          },
        }),
        provincia: new RefProp({
          getScheme: () => ProvinciaModel.scheme,
          field: {
            required: true,
          },
        }),
        ...COMMON_PROPS,
      },
    },
  ],
}
